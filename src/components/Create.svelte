<script>
    import {router} from 'tinro';
    import Loading from './Loading.svelte';
    import Error from './Error.svelte';
    import Form from './Form.svelte';
    import {authentication} from '../stores.js';

    export let entity;

    let data = {};
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
                <h2 class="page-title">Add new {entity}</h2>
            </div>
        </div>
    </div>

    <div class="row row-deck row-cards">
        <div class="col-6">
            <div class="card">
                <Form entity="{entity}" />
            </div>
        </div>
    </div>
{:catch error}
	<Error message="{error.message}" />
{/await}