"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const AdminForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Email ou senha incorretos.");
      return;
    }

    localStorage.setItem("admin-auth", "true");
    router.push("/admin/dashboard");
  }

  return (
    <div className=" w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-[#3BCF41] px-6 py-9 rounded-xl shadow-lg flex flex-col gap-10 w-[300px]"
      >
        <h2 className="text-xl font-bold text-center">Acesso Admin</h2>
        <div className="w-full flex flex-col gap-3">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 outline-none w-full"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 outline-none w-full"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#131413]  text-[#3BCF41] py-2 rounded hover:bg-[#1314139f] transition-all duration-300 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="button"
            className=" border-2 border-[#131413]  text-[#131413] py-2 rounded hover:bg-[#131413] hover:text-[#3BCF41] transition-all duration-300 cursor-pointer"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
