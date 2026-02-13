import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import { Users, Clock, RefreshCw, Briefcase, UserCheck } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ListaVip() {
  await connectDB();

  const guests = await Guest.find().sort({ confirmedAt: -1 });
  const totalGuests = guests.reduce((acc: any, curr: any) => acc + curr.guestsCount, 0);
  const totalEntries = guests.length;

  // --- ESTILOS (DEFINIDOS AQUI PRA NÃO TER ERRO) ---
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3e8ff', // Fundo Lilás Suave
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '20px',
      paddingBottom: '100px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
    },
    mobileFrame: {
      width: '100%',
      maxWidth: '600px', // Limita a largura pra não ficar esticado no PC
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '30px',
      marginTop: '10px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#4c1d95', // Roxo bem escuro
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
    subtitle: {
      color: '#9333ea',
      fontSize: '14px',
      fontWeight: '600',
      marginTop: '5px',
      backgroundColor: '#e9d5ff',
      padding: '4px 12px',
      borderRadius: '20px',
      display: 'inline-block',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '30px',
    },
    cardStat: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '20px',
      textAlign: 'center' as const,
      boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.15)', // Sombra Roxa
      border: '1px solid #fff',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    statLabel: {
      fontSize: '11px',
      fontWeight: '800',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      marginBottom: '5px',
    },
    statNumber: {
      fontSize: '42px',
      fontWeight: '900',
      lineHeight: '1',
    },
    listHeader: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#555',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      paddingLeft: '5px',
    },
    guestCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '16px 20px',
      marginBottom: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderLeft: '6px solid #d8b4fe', // Faixa lateral roxa
    },
    guestName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px',
    },
    guestDate: {
      fontSize: '12px',
      color: '#9ca3af',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontWeight: '500',
    },
    countBadge: {
      backgroundColor: '#f3e8ff',
      color: '#7e22ce',
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '800',
      fontSize: '18px',
    },
    footerBadge: {
      marginTop: '40px',
      textAlign: 'center' as const,
      backgroundColor: 'white',
      padding: '12px 20px',
      borderRadius: '50px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      border: '1px solid #f3e8ff',
    },
    refreshBtn: {
      position: 'fixed' as const,
      bottom: '25px',
      right: '25px',
      background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
      color: 'white',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(147, 51, 234, 0.4)',
      border: 'none',
      cursor: 'pointer',
      zIndex: 100,
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.mobileFrame}>
        
        {/* CABEÇALHO */}
        <div style={styles.header}>
          <h1 style={styles.title}>Lista da Maithe 🦋</h1>
          <span style={styles.subtitle}>Painel da Mamãe</span>
        </div>

        {/* DASHBOARD (NÚMEROS) */}
        <div style={styles.grid}>
          {/* Box Confirmados */}
          <div style={styles.cardStat}>
            <div style={{...styles.statLabel, color: '#a855f7'}}>Confirmados</div>
            <div style={{...styles.statNumber, color: '#7e22ce'}}>{totalGuests}</div>
            <div style={{fontSize: '10px', color: '#aaa'}}>Pessoas</div>
          </div>

          {/* Box Respostas */}
          <div style={styles.cardStat}>
            <div style={{...styles.statLabel, color: '#ec4899'}}>Respostas</div>
            <div style={{...styles.statNumber, color: '#be185d'}}>{totalEntries}</div>
            <div style={{fontSize: '10px', color: '#aaa'}}>Famílias</div>
          </div>
        </div>

        {/* LISTA */}
        <div>
          <h2 style={styles.listHeader}>
            <UserCheck size={20} color="#a855f7" />
            Últimas Confirmações
          </h2>

          {guests.length === 0 ? (
            <div style={{textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '15px', color: '#aaa'}}>
              Ninguém confirmou ainda... 🦗
            </div>
          ) : (
            guests.map((guest: any) => (
              <div key={guest._id} style={styles.guestCard}>
                <div>
                  <div style={styles.guestName}>{guest.name}</div>
                  <div style={styles.guestDate}>
                    <Clock size={12} />
                    {new Date(guest.confirmedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>

                <div style={styles.countBadge}>
                  {guest.guestsCount}
                  <Users size={10} style={{opacity: 0.6}} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER (SEU MERCHAN) */}
        <div style={styles.footerBadge}>
          <div style={{fontSize: '12px', fontWeight: 'bold', color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
            <Briefcase size={14} color="#9333ea" /> Sistema por Adriano Santos
          </div>
          <div style={{fontSize: '9px', color: '#9ca3af', marginTop: '2px'}}>
            (Toque aqui e solicite o seu)
          </div>
        </div>

      </div>

      {/* BOTÃO ATUALIZAR */}
      <a href="/lista-vip" style={styles.refreshBtn}>
        <RefreshCw size={24} />
      </a>

    </main>
  );
}