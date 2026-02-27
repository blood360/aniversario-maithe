'use server'

import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import { revalidatePath } from "next/cache";

export async function confirmPresence(prevState: any, formData: FormData) {
  try {
    // 1. Pegando os novos campos do formulário
    const name = formData.get('name');
    const adultsCount = formData.get('adultsCount');
    const childrenCount = formData.get('childrenCount');

    // 2. Validação básica (nome e pelo menos um adulto são obrigatórios)
    if (!name || !adultsCount) {
      return { success: false, message: 'Por favor, preencha o nome e a quantidade de adultos!' };
    }

    // 3. Conecta no Banco
    await connectDB();

    // 4. Cria o novo convidado com os dados detalhados
    await Guest.create({
      name: name.toString(),
      adultsCount: Number(adultsCount),
      childrenCount: Number(childrenCount),
      // Mantemos o guestsCount como a soma total para não quebrar o seu Painel VIP
      guestsCount: Number(adultsCount) + Number(childrenCount),
    });

    // 5. Atualiza o cache da página
    revalidatePath('/');
    revalidatePath('/lista-vip'); // Garante que o painel da mamãe atualize na hora

    // 6. Retorna sucesso para soltar os confetes!
    return { success: true, message: 'Presença confirmada com sucesso!' };

  } catch (error) {
    console.error("Erro ao salvar convidado:", error);
    return { success: false, message: 'Erro ao salvar no banco. Tente novamente!' };
  }
}