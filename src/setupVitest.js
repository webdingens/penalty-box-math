import createFechMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMock = createFechMock(vi);
fetchMock.enableMocks();
