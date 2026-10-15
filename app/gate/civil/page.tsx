import type { Metadata } from "next";
import GateBranchPage, {
  getGateBranchMetadata,
} from "@/components/GateBranchPage";
import { gateBranches } from "@/data/gate/branches";

const branch = gateBranches.civil;

export const metadata: Metadata = getGateBranchMetadata(branch);

export default function GateCivilPage() {
  return <GateBranchPage branch={branch} />;
}
