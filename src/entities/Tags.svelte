<script>
    import {Route, meta} from 'tinro';
	import List from '../components/List.svelte';
    import Details from '../components/Details.svelte';
    import Create from '../components/Create.svelte';
    import Date from '../components/Date.svelte';
</script>


<Route path="/">
    <List entity="tags" />
</Route>


<Route path="/add">
    <Create entity="tags" />
</Route>


<Route path="/:id" let:meta>
    <Details entity="tags" id="{meta.params.id}" />
</Route>