<script>
    import {router} from 'tinro';

    export let resource;
    export let data;

    console.log(data);

    let authentication = localStorage.getItem('authentication');

    if (authentication) {
        authentication = JSON.parse(authentication);
    }

    async function handleSubmit() {
        const url = `${authentication.url}/${resource}?apikey=${authentication.password}`;
		const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (response.ok) {
            router.goto(`/${resource}/${json.id}`)
        } else {
            alert('Something went wrong')
        }
	}
</script>

<div class="page-header d-print-none">
    <div class="row align-items-center">
        <div class="col">
            <div class="page-pretitle">
                <a href="/services" class="text-reset">
                    {resource}
                </a>
            </div>
            <h2 class="page-title">Add new {resource}</h2>
        </div>
    </div>
</div>

<div class="row row-deck row-cards">
    <div class="col-6">
        <div class="card">
            <form on:submit|preventDefault="{handleSubmit}">
                <div class="card-body">
                    <slot {data} {resource}></slot>
                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-blue">Create {resource}</button>
                </div>
            </form>
        </div>
    </div>
</div>