<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';
</script>


<Route path="/">
    <List entity="certificates" />
</Route>


<Route path="/add">
    <Create entity="certificates" />
</Route>


<Route path="/:id" let:meta>
    <Details entity="certificates" id="{meta.params.id}" />
</Route>