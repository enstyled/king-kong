<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';
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
    <Create resource="services" />
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