<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';

    let model = {
        cert: null,
        key: null,
        cert_alt: null,
        key_alt: null
    };
</script>


<Route path="/">
    <List resource="certificates" />
</Route>


<Route path="/add">
    <Create resource="certificates" let:resource data="{model}">
        <div class="mb-3">
            <label class="form-label" for="cert">Certificate</label>
            <textarea class="form-control" name="cert" rows="8" bind:value="{model.cert}" placeholder="-----BEGIN CERTIFICATE-----"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label" for="key">Certificate key</label>
            <textarea class="form-control" name="key" rows="8" bind:value="{model.key}" placeholder="-----BEGIN RSA PRIVATE KEY-----"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label" for="cert_alt">Certificate alternate</label>
            <textarea class="form-control" name="cert_alt" rows="8" bind:value="{model.cert_alt}" placeholder="-----BEGIN CERTIFICATE-----"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label" for="key_alt">Certificate alternate key</label>
            <textarea class="form-control" name="key_alt" rows="8" bind:value="{model.key_alt}" placeholder="-----BEGIN EC PRIVATE KEY-----"></textarea>
        </div>
    </Create>
</Route>


<Route path="/:id" let:meta>
    <Details resource="certificates" id="{meta.params.id}" />
</Route>