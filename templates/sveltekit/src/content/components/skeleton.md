---
title: Skeleton
description: Use to show a placeholder while content is loading.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/skeleton
---

<script>
  import { SkeletonDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/skeleton/SkeletonDemo.svelte">

<div slot="example">
<SkeletonDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add skeleton
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Skeleton } from '$components/ui/skeleton';
</script>
```

```svelte
<Skeleton class="h-[20px] w-[100px] rounded-full" />
```
