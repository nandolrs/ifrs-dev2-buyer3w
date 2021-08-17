import React from 'react';
import LocalView from '../Local/LocalView';
import ClasseView from '../Classe/ClasseView';
import ProdutoView from '../Produto/ProdutoView';
import EmbalagemView from '../Embalagem/EmbalagemView';
import UnidadeMedidaView from '../UnidadeMedida/UnidadeMedidaView';
import FichaProducaoView from '../FichaProducao/FichaProducaoView';
import UsuarioView from '../Usuario/UsuarioView';
import EstabelecimentoView from '../Estabelecimento/EstabelecimentoView';
import MovimentoView from '../Movimento/MovimentoView';
import UsuarioAutenticadorView from '../Usuario/UsuarioAutenticadorView';
import MaterialView from '../Material/MaterialView';
import EstoqueView from '../Estoque/EstoqueView';
import MenuView from '../Menu/MenuView';

import { isNumericLiteral } from '@babel/types';
import axios from 'axios';

//import ReactGA from 'react-ga';


class MaestroView extends React.Component
{
    constructor()
    {
        super();
        
        this.state={
            visao: null
            ,menu:'usuarioAutenticador' 

            ,visao:'' 
            ,token:''
            ,autenticado:false
            ,listaAutorizacao:'<INICIO>*<FIM>'
       };
    
       this.Autenticar();
    }

    Autenticar()
    {
        let token = window.getCookie("token");

        let entidade = {email:'', senha:'',token:token};

        if(token!='')
        {
            this.setState({visao:'processando'});
            let url = process.env.REACT_APP_SERVER_URL + "/api/usuarioautenticador/autenticar?email="+entidade.email+"&senha="+entidade.senha
            +'&tokenSessao='+entidade.token;
             axios.get(url      
             ,window.getCabeca()
                )
                .then((resposta)=>this.Autenticou(resposta))
                .catch((resposta) => this.Autenticou(resposta));

        }
    }

    OnAutenticou()
    {
        debugger;
        this.setState({menu:'local' ,autenticado:true});
    }

    Autenticou(resposta)
    {
        let retorno=null;

        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            { 
                if (resposta.data.confirmacao == "Sucesso!") {
                    this.OnAutenticou();                }
                 else{
                     
                    window.clearCookie("token");
                    retorno = {visao:"mensagem.sucesso",mensagens:window.ToMensagens("Faio.")};   
                    
            
                } 
            }
        }


    }

    Iniciar()
    {
        this.setState({menu:'local'});
    }

    Terminar()
    {
        this.setState({autenticado:false, menu:'usuarioAutenticador'});
    }

    render()
    {
        return(
            <div>

                <MenuView  
                        visao={this.state.visao} 
                        token={this.state.token}
                        autenticado={this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        OnClick={() => this.Iniciar()}        
                        OnSair={() => this.Terminar()}        
                        OnLocalPesquisar={() => this.setState({menu:'local'})}
                        OnEmbalagemPesquisar={() => this.setState({menu:'embalagem'})}
                        OnMovimentoPesquisar={() => this.setState({menu:'movimento'})}
                        OnUnidadeMedidaPesquisar={() => this.setState({menu:'unidadeMedida'})}
                        OnClassePesquisar={() => this.setState({menu:'classe'})}
                        OnProdutoPesquisar={() => this.setState({menu:'produto'})}
                        OnUsuarioPesquisar={() => this.setState({menu:'usuario'})}
                        OnEstabelecimentoPesquisar={() => this.setState({menu:'estabelecimento'})}
                        OnMaterialPesquisar={() => this.setState({menu:'material'})}
                        OnUsuarioAutenticadorPesquisar={() => this.setState({menu:'usuarioAutenticador'})}
                        OnFichaProducaoPesquisar={() => this.setState({menu:'fichaProducao'})}
                        OnEstoquePesquisar={() => this.setState({menu:'estoque'})}

                    />

                {window.location.pathname=='/local' || this.state.menu=='local' ?
                    <LocalView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }

                    {window.location.pathname=='/embalagem' || this.state.menu=='embalagem' ?
                    <EmbalagemView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }   

                    {window.location.pathname=='/movimento' || this.state.menu=='movimento' ?
                    <MovimentoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }   

                {window.location.pathname=='/unidademedida' || this.state.menu=='unidadeMedida' ?
                    <UnidadeMedidaView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }   

                {window.location.pathname=='/classe' || this.state.menu=='classe' ?
                    <ClasseView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }

                {window.location.pathname=='/produto' || this.state.menu=='produto' ?
                    <ProdutoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }

                {window.location.pathname=='/usuario' || this.state.menu=='usuario' ?
                    <UsuarioView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                        OnLogin={() => this.setState({menu:'usuarioAutenticador'}) }
                        />
                : "" 
                }   

                {window.location.pathname=='/estabelecimento' || this.state.menu=='estabelecimento' ?
                    <EstabelecimentoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 
                    />
                : "" 
                }   

                {this.state.autenticado==false
                && ( window.location.pathname=='/usuarioautenticador' 
                 || this.state.menu=='usuarioAutenticador') ?
                    <UsuarioAutenticadorView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.noexiste"})} 
                        OnAutenticou = {() => this.OnAutenticou()} 
                        OnCadastrar  = {() => this.setState({menu:'usuario'})}                                                 
                    />
                : "" 
                }   

                {window.location.pathname=='/material'  || this.state.menu=='material' ?
                    <MaterialView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.noexiste"})} 
                    />
                : "" 
                }   


                {window.location.pathname=='/fichaProducao'  || this.state.menu=='fichaProducao' ?
                    <FichaProducaoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.noexiste"})} 
                    />
                : "" 
                }   

                {window.location.pathname=='/estoque'  || this.state.menu=='estoque' ?
                    <EstoqueView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"painel.noexiste"})} 
                    />
                : "" 
                }   

            </div>
        );

    }
    
}

export default MaestroView;
