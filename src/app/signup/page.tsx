import AuthForm from "@/components/auth/auth-form";

export default function SignupPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full flex justify-center px-4">
                <AuthForm type="signup" />
            </div>
        </main>
    );
}
