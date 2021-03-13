<script>
    import {router} from 'tinro';
    import {authentication} from '../stores.js';

    let url = '';
    let password = '';
    let error;
    let loading = false
    let is_secure = location.protocol == 'https';

    function authenticate() {
        error = null;
        loading = true;

		fetch(`${url}?apikey=${password}`).then(function(response) {
            response.json().then(function(json) {
                if (response.ok) {
                    authentication.set({
                        url: url,
                        password: password
                    });

                    router.goto('/services');
                } else {
                    error = json.message;
                }
            });
        }).catch(function(error) {
            alert(error);
        }).finally(function() {
            loading = false;
        });
    }
</script>

<div class="flex-fill d-flex flex-column justify-content-center py-4">
    <div class="container-tight py-6">
        <h2 class="card-title text-center">Login to your Kong Admin API</h2>

        <form class="card card-md" autocomplete="off" on:submit|preventDefault={authenticate}>
            <div class="card-body">
                {#if error}
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-title">Authentication failed</h4>
                        <div class="text-muted">{error}</div>
                    </div>
                {/if}

                <div class="mb-3">
                    <label class="form-label">Kong Admin API URL</label>
                    <input type="url" class="form-control" placeholder="http://your-kong-server.com/admin" bind:value={url} required>
                </div>

                <div class="mb-2">
                    <label class="form-label">
                        Password
                        <span class="form-help" data-bs-toggle="popover" data-bs-placement="top" data-bs-html="true" data-bs-content="<p>ZIP Code must be US or CDN format. You can use an extended ZIP+4 code to determine address more accurately.</p><p class='mb-0'><a href=''>USP ZIP codes lookup tools</a></p>">?</span>
                    </label>

                    <div class="input-group input-group-flat">
                        <input type="password" class="form-control" placeholder="Password" autocomplete="off" bind:value={password} required>
                    </div>
                </div>

                <div class="form-footer">
                    <button type="submit" class="btn btn-primary {loading ? 'btn-loading' : '' } w-100">Authenticate</button>
                </div>
            </div>
        </form>

        <div class="text-center text-muted mt-3 small px-3">
            {#if is_secure}
                You are on a secure connection.
            {/if}

            The authentication details will be saved in your browser local storage.
        </div>
    </div>
</div>