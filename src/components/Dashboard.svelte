<script>
    import Loading from './Loading.svelte';

    let authentication = localStorage.getItem('authentication');

    if (authentication) {
        authentication = JSON.parse(authentication);
    }

    async function getData() {
        const url = `${authentication.url}/status?apikey=${authentication.password}`;
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
        <div class="col-sm-3">
            <div class="card">
                <div class="card-body px-2 py-4 text-center">
                    <div class="h1 m-0">{data.server.total_requests}</div>
                    <div class="text-muted">Total requests</div>
                </div>
            </div>
        </div>

        <div class="col-sm-3">
            <div class="card">
                <div class="card-body px-2 py-4 text-center">
                    <div class="h1 m-0">{data.server.connections_accepted}</div>
                    <div class="text-muted">Accepted connections</div>
                </div>
            </div>
        </div>

        <div class="col-sm-3">
            <div class="card">
                <div class="card-body px-2 py-4 text-center">
                    <div class="h1 m-0">{data.server.connections_active}</div>
                    <div class="text-muted">Active connections</div>
                </div>
            </div>
        </div>

        <div class="col-sm-3">
            <div class="card">
                <div class="card-body px-2 py-4 text-center">
                    <div class="h1 m-0">{data.server.connections_waiting}</div>
                    <div class="text-muted">Waiting connections</div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Kong memory</h3>
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
    <div class="d-flex flex-column justify-content-center">
        <div class="empty">
            <p class="empty-title">{error.message}</p>
        </div>
    </div>
{/await}