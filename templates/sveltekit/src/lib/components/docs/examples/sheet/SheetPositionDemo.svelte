<script lang="ts">
  import { Button } from '$components/ui/button';
  import { Input } from '$components/ui/input';
  import { Label } from '$components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$components/ui/radio-group';
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from '$components/ui/sheet';

  const SHEET_POSITIONS = ['top', 'right', 'bottom', 'left'] as const;

  type SheetPosition = (typeof SHEET_POSITIONS)[number];
  let position: SheetPosition = 'right';
</script>

<div class="flex flex-col space-y-8">
  <RadioGroup bind:value={position}>
    <div class="grid grid-cols-2 gap-2">
      {#each SHEET_POSITIONS as position, index (index)}
        <div class="flex items-center space-x-2">
          <RadioGroupItem value={position} id={position} />
          <Label for={position}>{position}</Label>
        </div>
      {/each}
    </div>
  </RadioGroup>
  <Sheet>
    <SheetTrigger>
      <Button>Open {position} sheet</Button>
    </SheetTrigger>
    <SheetContent {position} size="content">
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">Username</Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</div>
