import React from 'react';
import './CardProduto.css'; // Importando o novo arquivo CSS

const Estrelas = ({ qtde }) => (
  <div className="estrelas">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`estrela ${i < qtde ? 'estrela-preenchida' : 'estrela-vazia'}`} viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ))}
  </div>
);

export default function CardProduto({ produto, onComprar }) {
  return (
    <div className="card-produto">
      <div className="card-imagem-wrapper">
        <img src={produto.imagem} className="card-imagem" alt={produto.nome} />
        <div className="card-badge">
            <Estrelas qtde={produto.estrelas} />
        </div>
      </div>
      <div className="card-conteudo">
        <h4 className="card-titulo">{produto.nome}</h4>
        <p className="card-descricao">{produto.descricao}</p>
        <div className="card-rodape">
          <p className="card-preco">R$ {produto.precoTorcedor.toFixed(2)}</p>
          <button onClick={() => onComprar(produto)} className="btn-comprar">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}