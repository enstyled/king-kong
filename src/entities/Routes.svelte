<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';

    let model = {
        name: null,
        protocols: ['http', 'https'],
        methods: null,
        hosts: null,
        paths: null
    };
</script>


<Route path="/">
    <List resource="routes" let:data let:resource>
        <table class="table card-table table-vcenter text-nowrap datatable">
            <thead>
                <tr>
                    <th class="w-1">
                        <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices">
                    </th>
                    <th>Name</th>
                    <th>Paths</th>
                    <th>Service</th>
                    <th>Protocols</th>
                    <th>Methods</th>
                    <th class="text-end">Created at</th>
                </tr>
            </thead>
            <tbody>
                {#each data as entity, i}
                    <tr>
                        <td>
                            <input class="form-check-input m-0 align-middle" type="checkbox">
                        </td>
                        <td>
                            <a href="/{resource}/{entity.id}" class="text-reset">
                                {entity.name}
                            </a>
                        </td>
                        <td>{entity.paths}</td>
                        <td>
                            <a href="/services/{entity.service.id}" class="text-reset">
                                {entity.service.id}
                            </a>
                        </td>
                        <td>
                            {#each entity.protocols as protocol}
                                <span class="badge bg-blue-lt me-1">
                                    {protocol}
                                </span>
                            {/each}
                        </td>
                        <td>
                            {#if entity.methods}
                                {#each entity.methods as method}
                                    <span class="badge bg-green-lt me-1">
                                        {method}
                                    </span>
                                {/each}
                            {/if}
                        </td>
                        <td class="text-end">
                            <Date timestamp="{entity.created_at}" />
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </List>
</Route>


<Route path="/add">
    <Create resource="routes" let:resource data="{model}">
        <div class="mb-3">
            <label class="form-label" for="name">Name</label>
            <input type="text" class="form-control" name="name" bind:value="{model.name}" placeholder="Optional">
        </div>

        <div class="row">
            <div class="col-3">
                <div class="mb-3">
                    <label class="form-label" for="protocols">Protocols</label>
                    <input type="text" class="form-control" name="protocols" bind:value="{model.protocols}" placeholder="http">
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label" for="methods">Methods</label>
                    <input type="text" class="form-control" name="methods" bind:value="{model.methods}" placeholder="Optional">
                </div>
            </div>
            <div class="col-3">
                <div class="mb-3">
                    <label class="form-label" for="hosts">Hosts</label>
                    <input type="number" class="form-control" name="hosts" bind:value="{model.hosts}" placeholder="Optional">
                </div>
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label" for="paths">Paths</label>
            <input type="text" class="form-control" name="paths" bind:value="{model.paths}" placeholder="Optional">
        </div>
    </Create>
</Route>


<Route path="/:id" let:meta>
    <Details resource="routes" id="{meta.params.id}" let:data>
        <ul>
            <li>{data.id}</li>
            <li>{data.name}</li>
            <li>{data.paths}</li>
            <li>{data.service.id}</li>
            <li>{data.protocols}</li>
            <li>{data.methods}</li>
            <li>{data.created_at}</li>
            <li>{data.updated_at}</li>
        </ul>
    </Details>
</Route>