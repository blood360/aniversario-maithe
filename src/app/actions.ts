'use server'

import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import { revalidatePath } from "next/cache";

export async function confirmPresence(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name');
    const guestsCount = formData.get('guestsCount');

    // Validação básica
    if (!name || !guestsCount) {
      return { success: false, message: 'Por favor, preencha todos os campos!' };
    }

    // 1. Conecta no Banco
    await connectDB();

    // 2. Cria o novo convidado
    await Guest.create({
      name: name.toString(),
      guestsCount: Number(guestsCount),
    });

    // 3. Atualiza a página (se precisasse mostrar lista)
    revalidatePath('/');

    // 4. Retorna sucesso pro formulário soltar os confetes!
    return { success: true, message: 'Presença confirmada com sucesso!' };

  } catch (error) {
    console.error("Erro ao salvar convidado:", error);
    return { success: false, message: 'Erro ao salvar. Tente novamente!' };
  }
}