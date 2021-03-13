<script>
    import {Route, router, active, meta} from 'tinro';
    import Nav from './components/Nav.svelte';
    import Dashboard from './components/Dashboard.svelte';
	import List from './components/List.svelte';
    import Details from './components/Details.svelte';
    import Auth from './components/Auth.svelte';
    import Date from './components/Date.svelte';

    import Services from './entities/Services.svelte';
    import Routes from './entities/Routes.svelte';
    import Plugins from './entities/Plugins.svelte';
    import Consumers from './entities/Consumers.svelte';
    import Upstreams from './entities/Upstreams.svelte';
    import Certificates from './entities/Certificates.svelte';
    import Tags from './entities/Tags.svelte';

    import {authentication} from './stores.js';
</script>

<svelte:head>
    <script src="https://unpkg.com/@tabler/core@1.0.0-beta/dist/js/tabler.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@tabler/core@1.0.0-beta/dist/css/tabler.min.css">
</svelte:head>

<div class="page">
    {#if $authentication}
        <Nav />

        <div class="content">
            <div class="container-xl">
                <Route>
                    <Route path="/">
                        <Dashboard />
                    </Route>

                    <Route path="/services/*" firstmatch>
                        <Services />
                    </Route>

                    <Route path="/routes/*" firstmatch>
                        <Routes />
                    </Route>

                    <Route path="/plugins/*" firstmatch>
                        <Plugins />
                    </Route>

                    <Route path="/consumers/*" firstmatch>
                        <Consumers />
                    </Route>

                    <Route path="/upstreams/*" firstmatch>
                        <Upstreams />
                    </Route>

                    <Route path="/certificates/*" firstmatch>
                        <Certificates />
                    </Route>

                    <Route path="/tags/*" firstmatch>
                        <Tags />
                    </Route>

                    <Route fallback>
                        <div class="d-flex flex-column justify-content-center">
                            <div class="empty">
                                <p class="empty-title">Not found</p>
                                <p class="empty-subtitle text-muted">
                                    The page you are looking for is not found.
                                </p>
                                <div class="empty-action">
                                    <a href="/" class="btn btn-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /></svg>
                                        Go to the dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Route>
            </div>
        </div>
    {:else}
        <Auth />
    {/if}
</div>