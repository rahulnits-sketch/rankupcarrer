import type { Metadata } from "next";
import GateBranchPage, {
  getGateBranchMetadata,
} from "@/components/GateBranchPage";
import { gateBranches } from "@/data/gate/branches";

const branch = gateBranches.ece;

export const metadata: Metadata = getGateBranchMetadata(branch);

export default function GateEcePage() {
  return <GateBranchPage branch={branch} />;
}
