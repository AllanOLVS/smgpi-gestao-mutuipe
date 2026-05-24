import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../smgpi/AppShell";

export const Route = createFileRoute("/")({
    component: AppShell,
});
