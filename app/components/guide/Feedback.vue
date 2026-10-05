<template>
  <GuideSpec title="Badges">
    <div class="flex flex-wrap gap-2">
      <UiBadge>Ballroom</UiBadge>
      <UiBadge color="accent">Up to 400 guests</UiBadge>
      <UiBadge variant="solid">Most loved</UiBadge>
      <UiBadge variant="outline">New for 2027</UiBadge>
      <UiBadge color="success" icon="check">Available</UiBadge>
      <UiBadge color="warning">2 dates left</UiBadge>
      <UiBadge color="danger">Fully booked</UiBadge>
    </div>
  </GuideSpec>

  <GuideSpec title="Alerts" note="Status colors are fixed (not themed) so meaning never depends on the brand palette.">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      <UiAlert title="Open day on 14 March">Tour the ballroom, taste the menu and meet our event coordinators.</UiAlert>
      <UiAlert tone="success" title="Inquiry sent">Thank you! We'll reply within 24 hours with availability.</UiAlert>
      <UiAlert tone="warning" title="Limited availability">Only two Saturdays remain in September 2027.</UiAlert>
      <UiAlert tone="danger" title="Something went wrong">Your message couldn't be sent. Please try again or call us.</UiAlert>
    </div>
  </GuideSpec>
</template>
