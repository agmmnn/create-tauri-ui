<script lang="ts">
  import { ChevronsUpDown } from 'lucide-svelte';
  import { Button } from '$components/ui/button';
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$components/ui/collapsible';

  let isOpen = false;
</script>

<Collapsible open={isOpen} class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@thomasglopes starred 3 repositories</h4>
    <CollapsibleTrigger>
      <Button variant="ghost" size="sm" class="w-9 p-0">
        <ChevronsUpDown class="h-4 w-4" />
        <span class="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">tglide/radix-svelte</div>
  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">sveltejs/svelte</div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">sveltejs/kit</div>
  </CollapsibleContent>
</Collapsible>
