<script lang="ts">
  import { onMount } from 'svelte';
  import { Progress } from '$components/ui/progress';

  let progress = 13;
  onMount(() => {
    const timer = setTimeout(() => (progress = 66), 500);
    return () => clearTimeout(timer);
  });
</script>

<Progress value={progress} max={100} />
