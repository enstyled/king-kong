<script>
    import {router} from 'tinro';

    let url = '';
    let password = '';
    let loading = false

    function authenticate() {
        loading = true;

		fetch(`${url}?apikey=${password}`).then(function(response) {
            if (response.ok) {
                let data = JSON.stringify({
                    url: url,
                    password: password
                });

                localStorage.setItem('authentication', data);

                router.goto('/services');
            } else {
                alert('Authentication failed');
            }
        }).catch(function(error) {
            alert('Authentication failed');
        }).finally(function() {
            loading = false;
        });
    }
</script>

<div class="flex-fill d-flex flex-column justify-content-center py-4">
    <div class="container-tight py-6">
        <form class="card card-md" autocomplete="off" on:submit|preventDefault={authenticate}>
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Login to your Kong Admin API</h2>

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

                <div class="mb-2">
                    <label class="form-check">
                        <input type="checkbox" class="form-check-input">
                        <span class="form-check-label">Remember me on this device</span>
                    </label>
                </div>

                <div class="form-footer">
                    <button type="submit" class="btn btn-primary {loading ? 'btn-loading' : '' } w-100">Authenticate</button>
                </div>
            </div>
        </form>

        <div class="text-center text-muted mt-3">
            The authentication details will be saved in LocalStorage and won't leave your browser.
        </div>
    </div>
</div>