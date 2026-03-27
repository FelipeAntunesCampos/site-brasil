import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Dados do Catálogo (Mantenha os links das imagens reais aqui)
const CATALOGO = [
  { id: 1, nome: "Camisa Brasil Home 25/26", descricao: "A clássica amarelinha com tecnologia de ponta.", precoTorcedor: 349.90, precoJogador: 599.90, imagem: "https://images.unsplash.com/photo-1599408097116-299f06180575?q=80&w=600", temFeminino: true, estrelas: 5 },
  { id: 2, nome: "Camisa Brasil Away 25/26", descricao: "Azul vibrante inspirada na natureza brasileira.", precoTorcedor: 349.90, precoJogador: 599.90, imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600", temFeminino: true, estrelas: 5 },
  { id: 3, nome: "Camisa Treino Oficial", descricao: "Leveza e conforto para o dia a dia.", precoTorcedor: 199.90, precoJogador: null, imagem: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=600", temFeminino: false, estrelas: 4 },
];

// Componente Estrela para Avaliação
const Estrelas = ({ qtde }) => (
  <div className="flex items-center gap-0.5 text-yellow-500">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < qtde ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
    ))}
  </div>
);

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [verCarrinho, setVerCarrinho] = useState(false);
  const [produtoSelecionando, setProdutoSelecionando] = useState(null);
  const [escolha, setEscolha] = useState({ tamanho: 'M', versao: 'Torcedor', genero: 'Masculino' });

  // Funções de Lógica (Mantidas da versão anterior)
  const abrirSelecao = (produto) => {
    setProdutoSelecionando(produto);
    setEscolha({ tamanho: 'M', versao: 'Torcedor', genero: 'Masculino' });
  };

  const adicionarAoCarrinho = () => {
    const precoFinal = escolha.versao === 'Jogador' ? produtoSelecionando.precoJogador : produtoSelecionando.precoTorcedor;
    const idUnico = `${produtoSelecionando.id}-${escolha.tamanho}-${escolha.versao}-${escolha.genero}`;
    setCarrinho((prev) => {
      const itemExistente = prev.find(item => item.idUnico === idUnico);
      if (itemExistente) {
        return prev.map(item => item.idUnico === idUnico ? { ...item, quantidade: item.quantidade + 1 } : item);
      }
      return [...prev, { ...produtoSelecionando, idUnico, ...escolha, preco: precoFinal, quantidade: 1 }];
    });
    setProdutoSelecionando(null);
  };

  const alterarQuantidade = (idUnico, acao) => {
    setCarrinho((prev) => prev.map(item => {
      if (item.idUnico === idUnico) {
        const novaQtde = acao === 'aumentar' ? item.quantidade + 1 : item.quantidade - 1;
        return { ...item, quantidade: Math.max(1, novaQtde) };
      }
      return item;
    }));
  };

  const removerTotalmente = (idUnico) => {
    setCarrinho(carrinho.filter(item => item.idUnico !== idUnico));
  };

  const valorTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  const finalizarWhatsApp = () => {
    const telefone = "5519993566624"; // SEU NÚMERO AQUI
    const textoItens = carrinho.map(i => `*${i.nome}* (${i.quantidade}x)%0A- ${i.genero} (${i.versao}) | Tam: ${i.tamanho}%0A- Subtotal: R$ ${(i.preco * i.quantidade).toFixed(2)}`).join('%0A%0A');
    const msg = `Olá! Novo pedido da Flow Store:%0A%0A${textoItens}%0A%0A*TOTAL DO PEDIDO: R$ ${valorTotal.toFixed(2)}*`;
    window.open(`https://wa.me/${telefone}?text=${msg}`, "_blank");
  };

  return (
    // IMPORTANTE: Adicionei a fonte Inter via CDN no index.html ou configure no Tailwind
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Inter',_sans-serif]">
      
      {/* 1. Top Bar de Confiança */}
      <div className="bg-slate-900 text-white text-center py-2 text-xs font-medium tracking-wide px-4">
        🇧🇷 ENVIO RÁPIDO PARA TODO O BRASIL | COMPRA 100% SEGURA VIA WHATSAPP
      </div>

      {/* 2. Header Profissional */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇧🇷</span>
            <h1 className="text-2xl font-extrabold tracking-tighter text-slate-950">
              Brasil<span className="text-[#009739]">Store</span>
            </h1>
          </div>
          <button onClick={() => setVerCarrinho(!verCarrinho)} className="relative group flex items-center gap-3 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-full transition-all">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span className="font-semibold text-sm text-slate-950">Meu Carrinho</span>
            {totalItens > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#009739] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {totalItens}
              </span>
            )}
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!verCarrinho ? (
          <>
            {/* 3. Hero Section (Banner) */}
            <div className="bg-white rounded-3xl p-10 md:p-16 mb-12 border border-slate-100 shadow-lg shadow-slate-100/50 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-4">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Coleção Oficial 2026</span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-950 leading-tight">Vesta a Paixão.<br/> Sinta a Tecnologia.</h2>
                <p className="text-slate-600 text-lg max-w-md">As novas camisas da Seleção Brasileira unem o design clássico com a performance exigida pelos craques.</p>
              </div>
              <img src="https://imgnike-a.akamaihd.net/1920x1920/09761915A3.jpg" alt="Camisa Brasil" className="w-60 h-60 object-cover rounded-full shadow-2xl shadow-green-200 border-4 border-white" />
            </div>

            {/* 4. Grid de Produtos Premium */}
            <h3 className="text-2xl font-bold mb-8 text-slate-950 tracking-tight">Destaques da Coleção</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATALOGO.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img src={p.imagem} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={p.nome} />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-inner">
                        <Estrelas qtde={p.estrelas} />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-lg font-bold text-slate-950 truncate">{p.nome}</h4>
                    <p className="text-slate-500 text-sm line-clamp-2 h-10">{p.descricao}</p>
                    <div className="flex items-end justify-between pt-4">
                      <p className="text-2xl font-extrabold text-[#009739]">R$ {p.precoTorcedor.toFixed(2)}</p>
                      <button onClick={() => abrirSelecao(p)} className="bg-slate-900 text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-colors active:scale-95">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* 5. Carrinho Elegant */
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100">
            <button onClick={() => setVerCarrinho(false)} className="text-slate-500 hover:text-slate-900 font-medium mb-8 flex items-center gap-2 text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Voltar para a loja
            </button>
            <h2 className="text-3xl font-extrabold mb-10 tracking-tighter text-slate-950">Seu Carrinho</h2>
            
            {carrinho.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-6xl mb-6">🛒</p>
                <p className="text-slate-600 text-xl font-medium">Ops! Seu carrinho está vazio.</p>
                <p className="text-slate-500 mt-2">Adicione produtos para visualizar aqui.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {carrinho.map(item => (
                  <div key={item.idUnico} className="flex flex-col sm:flex-row gap-6 border-b pb-6 border-slate-100 items-center">
                    <img src={item.imagem} className="w-24 h-24 rounded-xl object-cover shadow-inner border border-slate-100" alt={item.nome} />
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <p className="font-bold text-lg text-slate-950">{item.nome}</p>
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider bg-slate-100 inline-block px-2 py-0.5 rounded">{item.genero} | {item.versao} | Tam: {item.tamanho}</p>
                      <p className="font-semibold text-slate-600 mt-1 text-sm">R$ {item.preco.toFixed(2)} un.</p>
                    </div>
                    
                    <div className="flex items-center gap-2 border border-slate-200 rounded-full p-1 bg-white shadow-inner">
                      <button onClick={() => alterarQuantidade(item.idUnico, 'diminuir')} className="w-8 h-8 rounded-full hover:bg-slate-100 font-bold text-xl text-slate-600">-</button>
                      <span className="px-2 font-bold text-lg text-slate-950 min-w-[30px] text-center">{item.quantidade}</span>
                      <button onClick={() => alterarQuantidade(item.idUnico, 'aumentar')} className="w-8 h-8 rounded-full hover:bg-slate-100 font-bold text-xl text-slate-600">+</button>
                    </div>

                    <div className="text-center sm:text-right min-w-[120px]">
                      <p className="text-slate-400 text-xs uppercase font-medium">Subtotal</p>
                      <p className="font-black text-xl text-slate-950">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                      <button onClick={() => removerTotalmente(item.idUnico)} className="text-red-500 text-xs font-medium hover:text-red-700 hover:underline">Remover</button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-slate-600 font-semibold uppercase text-sm tracking-wide">Total do Pedido:</span>
                    <span className="text-4xl font-black text-[#009739]">R$ {valorTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={finalizarWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-[#128C7E] transition-all flex justify-center items-center gap-3 hover:-translate-y-0.5">
                    Finalizar Pedido via WhatsApp 📱
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">Você será redirecionado para o WhatsApp para confirmar o pagamento e envio.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 6. Footer de Confiança */}
      <footer className="border-t border-slate-100 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className='space-y-2'>
                <h5 className='font-bold text-slate-950'>Sobre Nós</h5>
                <p className='text-sm text-slate-600'>Sua loja especializada em mantos sagrados da Seleção Brasileira. Qualidade premium garantida.</p>
            </div>
            <div className='space-y-2'>
                <h5 className='font-bold text-slate-950'>Pagamento Seguro</h5>
                <p className='text-sm text-slate-600'>PIX, Cartão de Crédito e Boleto bancário processados com segurança no checkout.</p>
            </div>
            <div className='space-y-2'>
                <h5 className='font-bold text-slate-950'>Contato</h5>
                <p className='text-sm text-slate-600'>FlowStore@brasilstore.com.br<br/>(19) 99356-6624</p>
            </div>
        </div>
        <div className="bg-slate-50 py-4 text-center text-xs text-slate-500 border-t border-slate-100">
          © 2024 Flow Store LTDA. Todos os direitos reservados.
        </div>
      </footer>

      {/* MODAL DE SELEÇÃO PREMIUM (Ajustado) */}
      {produtoSelecionando && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-300 border border-slate-100">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-extrabold tracking-tighter text-slate-950">{produtoSelecionando.nome}</h2>
                <button onClick={() => setProdutoSelecionando(null)} className='text-slate-400 hover:text-slate-600'>✕</button>
            </div>
            
            <div className="space-y-6">
              {/* Opções (Gênero, Versão, Tamanho) - Mantidas com estilo premium */}
              <div>
                <p className="font-semibold mb-2.5 text-sm text-slate-700">Gênero:</p>
                <div className="flex gap-2.5">
                  {['Masculino', 'Feminino'].map(g => (
                    (g === 'Masculino' || produtoSelecionando.temFeminino) && (
                        <button key={g} onClick={() => setEscolha({...escolha, genero: g, versao: g === 'Feminino' ? 'Torcedor' : escolha.versao})} className={`flex-1 py-3 border rounded-xl font-medium transition-all ${escolha.genero === g ? 'bg-[#009739] text-white border-[#009739] shadow-md' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>{g}</button>
                    )
                  ))}
                </div>
              </div>

              {escolha.genero === 'Masculino' && produtoSelecionando.precoJogador && (
                <div>
                  <p className="font-semibold mb-2.5 text-sm text-slate-700">Versão:</p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[{v: 'Torcedor', p: produtoSelecionando.precoTorcedor}, {v: 'Jogador', p: produtoSelecionando.precoJogador}].map(opt => (
                        <button key={opt.v} onClick={() => setEscolha({...escolha, versao: opt.v})} className={`p-4 border rounded-xl text-left flex justify-between items-center transition-all ${escolha.versao === opt.v ? 'bg-green-50 border-[#009739] ring-2 ring-[#009739]/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                            <span className={`font-semibold ${escolha.versao === opt.v ? 'text-[#009739]' : 'text-slate-900'}`}>{opt.v}</span>
                            <span className="font-bold text-lg text-slate-950">R$ {opt.p.toFixed(2)}</span>
                        </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-semibold mb-2.5 text-sm text-slate-700">Tamanho:</p>
                <div className="flex gap-2 justify-between">
                  {['P', 'M', 'G', 'GG'].map(t => (
                    <button key={t} onClick={() => setEscolha({...escolha, tamanho: t})} className={`w-14 h-14 border rounded-full transition-all text-lg font-bold ${escolha.tamanho === t ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-10">
              <button onClick={() => setProdutoSelecionando(null)} className="flex-1 bg-slate-100 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors">Cancelar</button>
              <button onClick={adicionarAoCarrinho} className="flex-1 bg-[#FDB913] py-3.5 rounded-xl font-bold text-green-950 shadow-md hover:bg-yellow-500 transition-colors active:scale-95">Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;