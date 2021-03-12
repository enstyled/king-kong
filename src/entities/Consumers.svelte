<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';

    let model = {
        username: null,
        custom_id: null
    };
</script>


<Route path="/">
    <List resource="consumers" let:data let:resource>
        <table class="table card-table table-vcenter text-nowrap datatable">
            <thead>
                <tr>
                    <th class="w-1">
                        <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices">
                    </th>
                    <th>Username</th>
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
                            <a href="/{resource}/{entity.id}" class="text-reset">
                                {entity.username}
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
    <Create resource="consumers" let:resource data="{model}">
        <div class="row">
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label" for="username">Username</label>
                    <input type="text" class="form-control" name="username" bind:value="{model.username}">
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3">
                    <label class="form-label" for="custom_id">Custom id</label>
                    <input type="text" class="form-control" name="custom_id" bind:value="{model.custom_id}">
                </div>
            </div>
        </div>
    </Create>
</Route>


<Route path="/:id" let:meta>
    <Details resource="consumers" id="{meta.params.id}" let:data>
        <ul>
            <li>{data.id}</li>
            <li>{data.username}</li>
            <li>{data.custom_id}</li>
            <li><Date timestamp="{data.created_at}" /></li>
        </ul>
    </Details>
</Route>