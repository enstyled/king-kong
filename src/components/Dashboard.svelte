<script>
    import Loading from './Loading.svelte';
    import Error from './Error.svelte';
    import {authentication} from '../stores.js';

    async function getData() {
        const url = `${$authentication.url}/status?apikey=${$authentication.password}`;
		const response = await fetch(url);
        const json = await response.json();
        return json;
	}

    let data = getData();
</script>


{#await data}
    <Loading />
{:then data}
    <div class="page-header d-print-none">
        <div class="row align-items-center">
            <div class="col">
                <h2 class="page-title">Dashboard</h2>
            </div>
            <div class="col">
                <div class="text-sm-end">
                    {#if data.database.reachable}
                        <span class="badge bg-success me-1"></span>
                        Database reachable
                    {:else}
                        <span class="badge bg-danger me-1"></span>
                        Database unreachable
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <div class="row row-deck row-cards">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <p class="mb-3">
                        <strong>{data.server.total_requests}</strong> total requests
                    </p>

                    <div class="progress progress-separated mb-3">
                        <div class="progress-bar bg-success" role="progressbar" style="width: {(data.server.connections_accepted / data.server.total_requests) * 100}%"></div>

                        <div class="progress-bar bg-info" role="progressbar" style="width: {((data.server.connections_handled - data.server.connections_accepted) / data.server.total_requests) * 100}%"></div>
                    </div>

                    <div class="row">
                        <div class="col-auto d-flex align-items-center pe-2">
                            <span class="legend me-2 bg-success"></span>
                            <span>Accepted</span>
                            <span class="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                {data.server.connections_accepted}
                            </span>
                        </div>
                        <div class="col-auto d-flex align-items-center px-2">
                            <span class="legend me-2 bg-info"></span>
                            <span>Handled</span>
                            <span class="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                {data.server.connections_handled}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <p class="mb-3">
                        <strong>{data.server.connections_active}</strong> active connections
                    </p>

                    <div class="progress progress-separated mb-3">
                        <div class="progress-bar bg-info" role="progressbar" style="width: {(data.server.connections_reading / data.server.connections_active) * 100}%"></div>

                        <div class="progress-bar bg-primary" role="progressbar" style="width: {(data.server.connections_writing / data.server.connections_active) * 100}%"></div>

                        <div class="progress-bar bg-yellow" role="progressbar" style="width: {(data.server.connections_waiting / data.server.connections_active) * 100}%"></div>
                    </div>

                    <div class="row">
                        <div class="col-auto d-flex align-items-center pe-2">
                            <span class="legend me-2 bg-info"></span>
                            <span>Reading</span>
                            <span class="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                {data.server.connections_reading}
                            </span>
                        </div>

                        <div class="col-auto d-flex align-items-center px-2">
                            <span class="legend me-2 bg-primary"></span>
                            <span>Writing</span>
                            <span class="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                {data.server.connections_writing}
                            </span>
                        </div>

                        <div class="col-auto d-flex align-items-center px-2">
                            <span class="legend me-2 bg-yellow"></span>
                            <span>Waiting</span>
                            <span class="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                                {data.server.connections_waiting}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Shared dictionaries</h3>
                </div>
                <table class="table card-table table-vcenter">
                    <thead>
                        <tr>
                            <th>Dictionary</th>
                            <th>Memory</th>
                            <th>Capacity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each Object.keys(data.memory.lua_shared_dicts) as dict}
                            <tr>
                                <td>{dict}</td>
                                <td>{data.memory.lua_shared_dicts[dict].allocated_slabs}</td>
                                <td>{data.memory.lua_shared_dicts[dict].capacity}</td>
                                <td class="w-50">
                                    <div class="progress progress-xs">
                                        <div class="progress-bar bg-primary" style="width: {(data.memory.lua_shared_dicts[dict].allocated_slabs.split(' ')[0] / data.memory.lua_shared_dicts[dict].capacity.split(' ')[0]) * 100}%"></div>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{:catch error}
    <Error message="{error.message}" />
{/await}