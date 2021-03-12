<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';

    let model = {
        name: null,
        protocol: 'http',
        host: null,
        port: 80,
        path: null
    };
</script>


<Route path="/">
    <List resource="services" let:data let:resource>
        <table class="table card-table table-vcenter text-nowrap datatable">
            <thead>
                <tr>
                    <th class="w-1">
                        <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices">
                    </th>
                    <th>Name</th>
                    <th>Protocol</th>
                    <th>Host</th>
                    <th>Port</th>
                    <th>Path</th>
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
                        <td>{entity.protocol}</td>
                        <td>{entity.host}</td>
                        <td>{entity.port}</td>
                        <td>{entity.path}</td>
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
    <Create resource="services" let:resource data="{model}">
        <div class="mb-3">
            <label class="form-label" for="name">Name</label>
            <input type="text" class="form-control" name="name" bind:value="{model.name}" placeholder="Optional">
        </div>

        <div class="row">
            <div class="col-3">
                <div class="mb-3">
                    <label class="form-label" for="protocol">Protocol</label>
                    <input type="text" class="form-control" name="protocol" bind:value="{model.protocol}" placeholder="http" required>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label" for="host">Host</label>
                    <input type="text" class="form-control" name="host" bind:value="{model.host}" placeholder="example.com" required>
                </div>
            </div>
            <div class="col-3">
                <div class="mb-3">
                    <label class="form-label" for="port">Port</label>
                    <input type="number" class="form-control" name="port" bind:value="{model.port}" placeholder="80" required>
                </div>
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label" for="path">Path</label>
            <input type="text" class="form-control" name="path" bind:value="{model.path}" placeholder="Optional">
        </div>
    </Create>
</Route>


<Route path="/:id" let:meta>
    <Details resource="services" id="{meta.params.id}" let:data>
        <ul>
            <li>{data.id}</li>
            <li>{data.name}</li>
            <li>{data.protocol}</li>
            <li>{data.host}</li>
            <li>{data.port}</li>
            <li>{data.path}</li>
            <li>{data.created_at}</li>
            <li>{data.updated_at}</li>
        </ul>
    </Details>
</Route>