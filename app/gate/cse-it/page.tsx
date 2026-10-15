import type { Metadata } from "next";
import GateBranchPage, {
  getGateBranchMetadata,
} from "@/components/GateBranchPage";
import { gateBranches } from "@/data/gate/branches";

const branch = gateBranches["cse-it"];

export const metadata: Metadata = getGateBranchMetadata(branch);

export default function GateCseItPage() {
  return <GateBranchPage branch={branch} />;
}
