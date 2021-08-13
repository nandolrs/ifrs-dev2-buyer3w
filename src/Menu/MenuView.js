import React from 'react';
import axios from 'axios';

//import UsuarioContaView from '../Usuario/UsuarioContaView';

class MenuView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={autenticado:this.props.autenticado, lista:null, listaAutorizacao:props.listaAutorizacao, usuarioBuscou:false};      
    }

    Sair()
    {
      this.props.OnClick();
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
                    
                    {/* cadastros */}

                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                      {/* local */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                      <a class="dropdown-item"   href="#" onClick={() => this.props.OnLocalPesquisar()}>Local</a>
                      : ""
                      }

                      {/* embalagem */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnEmbalagemPesquisar()}>Embalagem</a>
                        : ""
                      }

                      {/* unidade de medida */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnUnidadeMedidaPesquisar()}>Unidade de medida</a>
                        : ""
                      }

                      {/* classe */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnClassePesquisar()}>Classe</a>
                        : ""
                      }


                      {/* produto */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnProdutoPesquisar()}>Produto</a>
                        : ""
                      }

                      {/* usuario */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnUsuarioPesquisar()}>Usuário</a>
                        : ""
                      }

                      {/* estabelecimento */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnEstabelecimentoPesquisar()}>Estabelecimento</a>
                        : ""
                      }

                      {/* material */}

                      {window.AutorizacaoConsultar("*", this.props.listaAutorizacao) ?
                        <a class="dropdown-item"          href="#" onClick={() => this.props.OnMaterialPesquisar()}>Material</a>
                        : ""
                      }

                      </div>
                    </li>


                    {/* operações */}

                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Operações</a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

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