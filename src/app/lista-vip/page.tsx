import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import { Users, Clock, RefreshCw, Briefcase, UserCheck, Baby } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ListaVip() {
  await connectDB();

  const guests = await Guest.find().sort({ confirmedAt: -1 });
  
  // --- CÁLCULOS DOS TOTAIS ---
  const totalAdults = guests.reduce((acc: number, curr: any) => acc + (curr.adultsCount || 0), 0);
  const totalChildren = guests.reduce((acc: number, curr: any) => acc + (curr.childrenCount || 0), 0);
  const totalEntries = guests.length;

  // --- ESTILOS ---
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3e8ff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      paddingBottom: '100px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
    },
    mobileFrame: { width: '100%', maxWidth: '600px' },
    header: { textAlign: 'center' as const, marginBottom: '30px' },
    title: { fontSize: '28px', fontWeight: '800', color: '#4c1d95', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
    subtitle: { color: '#9333ea', fontSize: '14px', fontWeight: '600', backgroundColor: '#e9d5ff', padding: '4px 12px', borderRadius: '20px' },
    
    // Grid de 3 colunas para os números
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '30px' },
    
    cardStat: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '15px 5px',
      textAlign: 'center' as const,
      boxShadow: '0 4px 15px rgba(147, 51, 234, 0.1)',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center'
    },
    statLabel: { fontSize: '9px', fontWeight: '800', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '4px' },
    statNumber: { fontSize: '24px', fontWeight: '900', lineHeight: '1' },
    
    listHeader: { fontSize: '18px', fontWeight: '700', color: '#555', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' },
    guestCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '16px 20px',
      marginBottom: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderLeft: '6px solid #d8b4fe',
    },
    guestInfo: { flex: 1 },
    guestName: { fontSize: '16px', fontWeight: '700', color: '#1f2937' },
    guestCounts: { fontSize: '12px', color: '#7e22ce', fontWeight: '600', marginTop: '2px' },
    guestDate: { fontSize: '10px', color: '#9ca3af', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' },
    
    totalBadge: {
      backgroundColor: '#f3e8ff',
      color: '#7e22ce',
      padding: '8px 12px',
      borderRadius: '12px',
      textAlign: 'center' as const,
      minWidth: '50px'
    },
    totalNumber: { fontSize: '18px', fontWeight: '900', display: 'block' },
    totalLabel: { fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase' as const },
    
    footerBadge: { marginTop: '40px', textAlign: 'center' as const, backgroundColor: 'white', padding: '12px 20px', borderRadius: '50px', border: '1px solid #f3e8ff' },
    refreshBtn: { position: 'fixed' as const, bottom: '25px', right: '25px', background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(147, 51, 234, 0.4)', border: 'none', cursor: 'pointer', zIndex: 100 }
  };

  return (
    <main style={styles.container}>
      <div style={styles.mobileFrame}>
        
        <div style={styles.header}>
          <h1 style={styles.title}>Lista da Maitê 🦋</h1>
          <span style={styles.subtitle}>Painel da Mamãe</span>
        </div>

        {/* DASHBOARD COM 3 COLUNAS */}
        <div style={styles.grid}>
          <div style={styles.cardStat}>
            <div style={{...styles.statLabel, color: '#a855f7'}}>Adultos</div>
            {/* CORRIGIDO PARA totalAdults */}
            <div style={{...styles.statNumber, color: '#7e22ce'}}>{totalAdults}</div>
          </div>

          <div style={styles.cardStat}>
            <div style={{...styles.statLabel, color: '#ec4899'}}>Crianças</div>
            <div style={{...styles.statNumber, color: '#be185d'}}>{totalChildren}</div>
          </div>

          <div style={styles.cardStat}>
            <div style={{...styles.statLabel, color: '#6b7280'}}>Famílias</div>
            <div style={{...styles.statNumber, color: '#374151'}}>{totalEntries}</div>
          </div>
        </div>

        <div>
          <h2 style={styles.listHeader}>
            <UserCheck size={20} color="#a855f7" />
            Presenças Confirmadas
          </h2>

          {guests.length === 0 ? (
            <div style={{textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '15px', color: '#aaa'}}>
              Aguardando confirmações... 🦗
            </div>
          ) : (
            guests.map((guest: any) => (
              <div key={guest._id} style={styles.guestCard}>
                <div style={styles.guestInfo}>
                  <div style={styles.guestName}>{guest.name}</div>
                  <div style={styles.guestCounts}>
                    {guest.adultsCount} Adultos • {guest.childrenCount} Crianças
                  </div>
                  <div style={styles.guestDate}>
                    <Clock size={10} />
                    {new Date(guest.confirmedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>

                <div style={styles.totalBadge}>
                  <span style={styles.totalNumber}>{guest.guestsCount}</span>
                  <span style={styles.totalLabel}>Total</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.footerBadge}>
          <div style={{fontSize: '12px', fontWeight: 'bold', color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
            <Briefcase size={14} color="#9333ea" /> Sistema por Adriano Santos
          </div>
        </div>

      </div>

      <a href="/lista-vip" style={styles.refreshBtn}>
        <RefreshCw size={24} />
      </a>

    </main>
  );
}