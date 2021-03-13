<script>
    import {router} from 'tinro';
    import Loading from './Loading.svelte';
    import {authentication} from '../stores.js';

    export let entity;

    let data = {};

    async function getSchema() {
        const url = `${$authentication.url}/schemas/${entity}?apikey=${$authentication.password}`;
		const response = await fetch(url);
        const json = await response.json();

        const transformed = json.fields.map(function(field) {
            return {
                name: Object.keys(field)[0],
                ...Object.values(field)[0]
            }
        });

        // Map the schema to the form data
        transformed.forEach((field) => {
            if (!field.auto) {
                data[field.name] = field.default || null;
            }
        });

        return transformed;
	}

    let schema = getSchema();

    async function handleSubmit() {
        const url = `${$authentication.url}/${entity}?apikey=${$authentication.password}`;
		const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (response.ok) {
            router.goto(`/${entity}/${json.id}`)
        } else {
            alert('Something went wrong')
        }
	}
</script>

{#await schema}
	<Loading />
{:then schema}
    <div class="page-header d-print-none">
        <div class="row align-items-center">
            <div class="col">
                <div class="page-pretitle">
                    <a href="/{entity}" class="text-reset">
                        {entity}
                    </a>
                </div>
                <h2 class="page-title">Add new {entity}</h2>
            </div>
        </div>
    </div>

    <div class="row row-deck row-cards">
        <div class="col-6">
            <div class="card">
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
                                                <select class="form-select" name="{field.name}">
                                                    {#each field.one_of as option}
                                                        <option value="{option}" selected="{option == field.default}">
                                                            {option}
                                                        </option>
                                                    {/each}
                                                </select>
                                            {:else}
                                                <div class="pt-2">
                                                    {#each field.one_of as option}
                                                        <label class="form-check">
                                                            <input class="form-check-input" type="radio" name="{field.name}" checked="{option == field.default}">
                                                            <span class="form-check-label">
                                                                {option}
                                                            </span>
                                                        </label>
                                                    {/each}
                                                </div>
                                            {/if}
                                        {:else if field.type == 'boolean'}
                                            <label class="form-check form-switch pt-2">
                                                <input class="form-check-input" type="checkbox" name="{field.name}" checked="{field.default}">
                                            </label>
                                        {:else if field.type == 'set' && field.elements && 'one_of' in field.elements}
                                            <div class="pt-2">
                                                {#each field.elements.one_of as element}
                                                    <label class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" name="{field.name}" checked="{field.default.includes(element)}">
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
                        <button type="submit" class="btn btn-blue">Create {entity}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}