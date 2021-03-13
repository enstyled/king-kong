<script>
    import {router} from 'tinro';
    import Loading from './Loading.svelte';
    import Error from './Error.svelte';

    export let entity;
    export let id;

    let authentication = localStorage.getItem('authentication');

    if (authentication) {
        authentication = JSON.parse(authentication);
    }

    async function getData() {
        const url = `${authentication.url}/${entity}/${id}?apikey=${authentication.password}`;
		const response = await fetch(url);
        const json = await response.json();

        console.log(response, json);

        if (response.ok) {
            return json;
        } else {
            throw json;
        }
	}

    let data = getData();


    async function deleteEntity() {
        const url = `${authentication.url}/${entity}/${id}?apikey=${authentication.password}`;
		const response = await fetch(url, {
            method: 'DELETE'
        });

		if (response.ok) {
            router.goto(`/${entity}`);
        } else {
            alert("Something went wrong");
        }
    }
</script>

{#await data}
	<Loading />
{:then data}
    <div class="page-header d-print-none">
        <div class="row align-items-center">
            <div class="col">
                <div class="page-pretitle">
                    <a href="/{entity}" class="text-reset">
                        {entity}
                    </a>
                </div>
                <h2 class="page-title">{data.id}</h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
                <div class="btn-list">
                    <a href="/{entity}/{data.id}/edit" class="btn btn-primary d-none d-sm-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                        <span class="d-none d-sm-inline">
                            Edit {entity}
                        </span>
                    </a>

                    <button type="button" class="btn btn-danger d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        <span class="d-none d-sm-inline">
                            Delete {entity}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="row row-deck row-cards">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <slot {data}></slot>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-delete" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-status bg-danger"></div>
                <div class="modal-body text-center py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon mb-2 text-danger icon-lg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 9v2m0 4v.01"></path><path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path></svg>
                    <h3>Are you sure you want to remove this {entity}?</h3>
                </div>

                <div class="modal-footer">
                    <div class="w-100">
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-white w-100" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-danger w-100" data-bs-dismiss="modal" on:click="{deleteEntity}">
                                    Delete {entity}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:catch error}
    <Error message="{error.message}" />
{/await}