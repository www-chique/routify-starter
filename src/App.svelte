<script lang="ts">
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<style  global>
  @import "smelte/src/tailwind.css";
  @import "../static/global.css";
</style>

<Router {routes} />