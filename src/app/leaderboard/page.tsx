import { LeaderboardTransaksi } from "@/shared/components/leaderboard/page";
import { AuthenticationLayout } from "@/shared/providers/authenticationLayout";

export default function Page(){
    return (
        <AuthenticationLayout>
       <LeaderboardTransaksi />
        </AuthenticationLayout>
    )
}