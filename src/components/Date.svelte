<script>
    export let timestamp;
</script>

<span title="{new Date(timestamp * 1000)}">
    {new Date(timestamp * 1000).toLocaleDateString()}
</span>