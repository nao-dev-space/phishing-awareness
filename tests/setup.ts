import { vi } from "vitest";

vi.stubGlobal("scrollTo", (): void => undefined);
