<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';
</script>

<Route path="/">
    <List entity="services" let:data let:entity>
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
                {#each data as record, i}
                    <tr>
                        <td>
                            <input class="form-check-input m-0 align-middle" type="checkbox">
                        </td>
                        <td>
                            <a href="/{entity}/{record.id}" class="text-reset">
                                {record.name}
                            </a>
                        </td>
                        <td>{record.protocol}</td>
                        <td>{record.host}</td>
                        <td>{record.port}</td>
                        <td>{record.path}</td>
                        <td class="text-end">
                            <Date timestamp="{record.created_at}" />
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </List>
</Route>


<Route path="/add">
    <Create entity="services" />
</Route>


<Route path="/:id" let:meta>
    <Details entity="services" id="{meta.params.id}" let:data />
</Route>