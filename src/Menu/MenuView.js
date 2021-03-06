import React from 'react';
import axios from 'axios';

import UsuarioContaView from '../Usuario/UsuarioContaView';

class MenuView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={autenticado:this.props.autenticado, lista:null, listaAutorizacao:props.listaAutorizacao, usuarioBuscou:false};      
    }

    Sair()
    {
      //this.props.OnClick();
      //windows.setCookie();
      this.props.OnSair();
    }




render()
{
      return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#" onClick = {() => this.props.OnLocalPesquisar()}>
                  <h1>
                  Buyer

                  </h1>
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                {this.props.autenticado && this.props.listaAutorizacao != "" ?
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">

                    {/* conta  */}

                    <UsuarioContaView 
                      OnSair={()=> this.Sair()}
                    />

                    {/* cadastros */}

                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">


                      {/* classe */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnClassePesquisar()}>Classe</a>
                        : ""
                      }

                      {/* embalagem */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnEmbalagemPesquisar()}>Embalagem</a>
                        : ""
                      }

                      {/* estabelecimento */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnEstabelecimentoPesquisar()}>Estabelecimento</a>
                        : ""
                      }

                      {/* ficha de producao (receita) */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnFichaProducaoPesquisar()}>Ficha de produ????o (receita)</a>
                        : ""
                      }

                      {/* local */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                      <a class="dropdown-item"   href="#" onClick={() => this.props.OnLocalPesquisar()}>Local</a>
                      : ""
                      }

                      {/* material */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnMaterialPesquisar()}>Material</a>
                        : ""
                      }

                      {/* produto */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnProdutoPesquisar()}>Produto</a>
                        : ""
                      }

                      {/* receita */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnReceitaPesquisar()}>Receita</a>
                        : ""
                      }

                      {/* unidade de medida */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnUnidadeMedidaPesquisar()}>Unidade de medida</a>
                        : ""
                      }

                      {/* usuario */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnUsuarioPesquisar()}>Usu??rio</a>
                        : ""
                      }




                      </div>
                    </li>


                    {/* opera????es */}

                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Opera????es</a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                      {/* estoque */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnEstoquePesquisar()}>Estoque</a>
                        : ""
                      }

                      {/* movimento */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnMovimentoPesquisar()}>Movimento</a>
                        : ""
                      }

                    <span><hr/></span>

                      </div>

                    </li>
                    
                    </ul>

                    </div>
                : ""
                }
            </nav>
        </div>
    );
}

    
}

export default MenuView;