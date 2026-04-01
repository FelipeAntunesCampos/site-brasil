import { useState } from 'react';
import CardProduto from './components/CardProduto.jsx';
import './App.css'; 
import imagemVoleio from './assets/voleio.png';

const CATALOGO = [
  { id: 1, nome: "Camisa Brasil Home 25/26", descricao: "A clássica amarelinha com tecnologia de ponta.", precoTorcedor: 349.90, precoJogador: 599.90, imagem: "https://images.unsplash.com/photo-1599408097116-299f06180575?q=80&w=600", temFeminino: true, estrelas: 5 },
  { id: 2, nome: "Camisa Brasil Away 25/26", descricao: "Azul vibrante inspirada na natureza brasileira.", precoTorcedor: 349.90, precoJogador: 599.90, imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600", temFeminino: true, estrelas: 5 },

];

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [verCarrinho, setVerCarrinho] = useState(false);
  const [produtoSelecionando, setProdutoSelecionando] = useState(null);
  const [escolha, setEscolha] = useState({ tamanho: 'M', versao: 'Torcedor', genero: 'Masculino' });

  const irParaHome = () => setVerCarrinho(false);
  const abrirCarrinho = () => setVerCarrinho(true);

  const abrirSelecao = (p) => {
    setProdutoSelecionando(p);
    setEscolha({ tamanho: 'M', versao: 'Torcedor', genero: 'Masculino' });
  };

  const adicionarAoCarrinho = () => {
    const precoFinal = escolha.versao === 'Jogador' ? produtoSelecionando.precoJogador : produtoSelecionando.precoTorcedor;
    const idUnico = `${produtoSelecionando.id}-${escolha.tamanho}-${escolha.versao}-${escolha.genero}`;
    
    setCarrinho((prev) => {
      const existe = prev.find(i => i.idUnico === idUnico);
      if (existe) return prev.map(i => i.idUnico === idUnico ? { ...i, quantidade: i.quantidade + 1 } : i);
      return [...prev, { ...produtoSelecionando, idUnico, ...escolha, preco: precoFinal, quantidade: 1 }];
    });
    setProdutoSelecionando(null);
    setVerCarrinho(true);
  };

  const alterarQuantidade = (id, acao) => {
    setCarrinho(prev => prev.map(i => i.idUnico === id ? { ...i, quantidade: Math.max(1, acao === 'add' ? i.quantidade + 1 : i.quantidade - 1) } : i));
  };

  const valorTotal = carrinho.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);
  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <div className="app-container">
      <div className="top-bar">🇧🇷 ENVIO RÁPIDO PARA TODO O BRASIL | COMPRA SEGURA</div>

      <header className="header">
        <nav className="nav-container">
          <div className="logo-container" onClick={irParaHome}>
            <span className="logo-icon">🇧🇷</span>
            <h1 className="logo-text">Flow<span className="logo-highlight">Store</span></h1>
          </div>
          
          <button onClick={abrirCarrinho} className="btn-carrinho">
            <div className="carrinho-wrapper">
               <svg className="icon-carrinho" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
               {totalItens > 0 && <span className="badge-carrinho">{totalItens}</span>}
            </div>
            <span className="texto-btn-carrinho">Carrinho</span>
          </button>
        </nav>
      </header>

      <main className="main-content">
        {!verCarrinho ? (
          <>
            <div className="hero-section">
              <div className="hero-text">
                <span className="hero-tag">Tailandesa 1.1 - Premium</span>
                <h2 className="hero-titulo">Vesta a Paixão.<br/> <span>Sinta a Tecnologia.</span></h2>
                <p className="hero-descricao">As novas camisas da Seleção Brasileira com tecnologia de absorção e caimento perfeito.</p>
              </div>
              <div className="hero-imagem-container">
                <img src={imagemVoleio} alt="Voleio" className="hero-imagem-render" />
              </div>
            </div>

            <h3 className="section-titulo">Destaques</h3>
            <div className="grid-produtos">
              {CATALOGO.map(p => <CardProduto key={p.id} produto={p} onComprar={abrirSelecao} />)}
            </div>
          </>
        ) : (
          <div className="carrinho-page">
            <button onClick={irParaHome} className="btn-voltar-home">← Continuar Comprando</button>
            
            {carrinho.length === 0 ? (
              <div className="carrinho-vazio-container">
                <div className="vazio-icon">🛒</div>
                <h2>Seu carrinho está vazio</h2>
                <p>Parece que você ainda não escolheu seu manto.</p>
                <button onClick={irParaHome} className="btn-finalizar">Ver Produtos</button>
              </div>
            ) : (
              <div className="carrinho-cheio">
                <h2 className="carrinho-titulo">Seu Carrinho</h2>
                {carrinho.map(item => (
                  <div key={item.idUnico} className="carrinho-item">
                    <img src={item.imagem} alt={item.nome} />
                    <div className="item-info">
                      <h4>{item.nome}</h4>
                      <p>{item.genero} | {item.versao} | {item.tamanho}</p>
                      <strong>R$ {item.preco.toFixed(2)}</strong>
                    </div>
                    <div className="item-controles">
                      <button onClick={() => alterarQuantidade(item.idUnico, 'sub')}>-</button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => alterarQuantidade(item.idUnico, 'add')}>+</button>
                    </div>
                  </div>
                ))}
                <div className="resumo-total">
                  <div className="total-linha"><span>Total:</span> <span>R$ {valorTotal.toFixed(2)}</span></div>
                  <button className="btn-finalizar">Finalizar no WhatsApp</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer-slim">
        <div className="footer-content">
          <p>Flow Store © 2026 | Qualidade Premium Tailandesa</p>
          <div className="footer-links">Suporte | WhatsApp | Instagram</div>
        </div>
      </footer>

      {produtoSelecionando && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="fechar-modal" onClick={() => setProdutoSelecionando(null)}>✕</button>
            <h3>{produtoSelecionando.nome}</h3>
            
            <div className="modal-opcoes">
              <p>Gênero:</p>
              <div className="flex-grid">
                {['Masculino', 'Feminino'].map(g => (
                  (g === 'Masculino' || produtoSelecionando.temFeminino) && (
                    <button key={g} onClick={() => setEscolha({...escolha, genero: g, versao: g === 'Feminino' ? 'Torcedor' : escolha.versao})} 
                    className={escolha.genero === g ? 'active' : ''}>{g}</button>
                  )
                ))}
              </div>
            </div>

            {escolha.genero === 'Masculino' && produtoSelecionando.precoJogador && (
              <div className="modal-opcoes">
                <p>Versão:</p>
                <div className="flex-grid">
                  {['Torcedor', 'Jogador'].map(v => (
                    <button key={v} onClick={() => setEscolha({...escolha, versao: v})} 
                    className={escolha.versao === v ? 'active' : ''}>
                      {v} (R$ {v === 'Torcedor' ? produtoSelecionando.precoTorcedor.toFixed(2) : produtoSelecionando.precoJogador.toFixed(2)})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-opcoes">
              <p>Tamanho:</p>
              <div className="flex-grid">
                {['P', 'M', 'G', 'GG'].map(t => (
                  <button key={t} onClick={() => setEscolha({...escolha, tamanho: t})} 
                  className={escolha.tamanho === t ? 'active' : ''}>{t}</button>
                ))}
              </div>
            </div>

            <button onClick={adicionarAoCarrinho} className="btn-finalizar">Adicionar ao Carrinho</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;