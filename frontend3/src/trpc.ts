import { createTRPCReact } from '@trpc/react-query';
import type {Router} from "../../services/server/trpc";
export const trpc = createTRPCReact<Router>();