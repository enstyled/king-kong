<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';
</script>

<Route path="/">
    <List entity="upstreams" let:data let:entity>
        <table class="table card-table table-vcenter text-nowrap datatable">
            <thead>
                <tr>
                    <th class="w-1">
                        <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices">
                    </th>
                    <th>Name</th>
                    <th>Custom id</th>
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
                            <a href="/{entity}/{entity.id}" class="text-reset">
                                {entity.name}
                            </a>
                        </td>
                        <td>{entity.custom_id}</td>
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
    <Create entity="upstreams" />
</Route>


<Route path="/:id" let:meta>
    <Details entity="upstreams" id="{meta.params.id}" let:data>
        <ul>
            <li>{data.id}</li>
            <li>{data.username}</li>
            <li>{data.custom_id}</li>
            <li><Date timestamp="{data.created_at}" /></li>
        </ul>
    </Details>
</Route>