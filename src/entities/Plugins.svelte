<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';
</script>

<Route path="/">
    <List resource="plugins" let:data let:resource>
        <table class="table card-table table-vcenter text-nowrap datatable">
            <thead>
                <tr>
                    <th class="w-1">
                        <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices">
                    </th>
                    <th>Name</th>
                    <th>Route</th>
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
                        <td>{entity.route}</td>
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
    <Create resource="plugins" />
</Route>


<Route path="/:id" let:meta>
    <Details resource="plugins" id="{meta.params.id}" let:data>
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