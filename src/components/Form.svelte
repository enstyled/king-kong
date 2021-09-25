<script>
    import {router} from 'tinro';
    import {authentication} from '../stores.js';
    import Loading from './Loading.svelte';
    import Error from './Error.svelte';

    export let entity;
    export let data = {};

    let schema = getSchema();

    async function getSchema() {
        const url = `${$authentication.url}/schemas/${entity}`;
        const response = await fetch(url, {
            headers: {
                apikey: $authentication.password
            }
        });
        const json = await response.json();

        const transformed = json.fields.map(function(field) {
            return {
                name: Object.keys(field)[0],
                ...Object.values(field)[0]
            }
        });

        // Map the schema to the form data
        transformed.forEach((field) => {
            if (!field.auto && !data[field.name]) {
                data[field.name] = field.default;
            }
        });

        return transformed;
	}

    async function handleSubmit() {
        const url = `${$authentication.url}/${entity}/${data.id || ''}`;
        const response = await fetch(url, {
            method: data.id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: $authentication.password
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (response.ok) {
            router.goto(`/${entity}/${json.id}`);
        } else {
            alert('Something went wrong');
        }
	}
</script>

{#await schema}
	<Loading />
{:then schema}
    <form on:submit|preventDefault="{handleSubmit}">
        <div class="card-body">
            {#each schema as field}
                {#if !field.auto}
                    <div class="form-group row mb-3">
                        <label class="col-4 col-form-label form-label text-capitalize" for="{field.name}">
                            {field.name.replace(/_/g, ' ')}
                        </label>

                        <div class="col">
                            {#if field.one_of}
                                {#if field.one_of.length > 3}
                                    <select class="form-select" name="{field.name}" bind:value="{data[field.name]}">
                                        {#each field.one_of as option}
                                            <option value="{option}">
                                                {option}
                                            </option>
                                        {/each}
                                    </select>
                                {:else}
                                    <div class="pt-2">
                                        {#each field.one_of as option}
                                            <label class="form-check">
                                                <input class="form-check-input" type="radio" bind:group="{data[field.name]}" value="{option}" checked="{data[field.name].includes(option)}">
                                                <span class="form-check-label">
                                                    {option}
                                                </span>
                                            </label>
                                        {/each}
                                    </div>
                                {/if}
                            {:else if field.type == 'boolean'}
                                <label class="form-check form-switch pt-2">
                                    <input class="form-check-input" type="checkbox" bind:checked="{data[field.name]}">
                                </label>
                            {:else if field.type == 'set' && field.elements && 'one_of' in field.elements}
                                <div class="pt-2">
                                    {#each field.elements.one_of as element}
                                        <label class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" bind:group="{data[field.name]}" value="{element}" checked="{data[field.name].includes(element)}">
                                            <span class="form-check-label">
                                                {element}
                                            </span>
                                        </label>
                                    {/each}
                                </div>
                            {:else}
                                {#if field.type == 'integer'}
                                    <input type="number" class="form-control" name="{field.name}" min="{field.between ? field.between[0] : ''}" max="{field.between ? field.between[1] : ''}" bind:value="{data[field.name]}" required="{field.required}">
                                {:else}
                                    <input type="text" class="form-control" name="{field.name}" bind:value="{data[field.name]}" required="{field.required}">
                                {/if}
                            {/if}
                        </div>
                    </div>
                {/if}
            {/each}
        </div>

        <div class="card-footer">
            <button type="submit" class="btn btn-blue">{data.id ? 'Update' : 'Create'} {entity}</button>
        </div>
    </form>
{:catch error}
	<Error message="{error.message}" />
{/await}