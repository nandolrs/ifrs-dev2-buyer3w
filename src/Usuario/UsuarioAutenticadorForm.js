import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class UsuarioAutenticadorForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                ,email:''
                ,senha:''
                ,visao:process.env.REACT_APP_VISAO_INFORMANDO
                ,mensagens:null

            };
        }
        else
        {             
            this.state={
                id:this.props.entidade.id
               ,visao:'processando'
               ,mensagens:null

           };
           let entidade = {id:this.props.entidade.id}

           this.SisManterConsultar(entidade);
        }
    }
        
    Salvar()
    {
        let entidade =  {
        email:this.state.email
        ,senha:this.state.senha
        };
        this.SisManterSalvar(entidade);
    }

    Excluir()
    {
        let entidade =  {
        id:this.state.id
        };
        this.SisManterExcluir(entidade);
    }



    SisManterExcluir(entidade)
    {
        this.setState({visao:'processando'});

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuario/excluir/" + entidade.id
            ,window.getCabeca())
            .then((resposta)=>this.Excluiu(resposta))
            .catch((resposta => this.Excluiu(resposta))
            );

    }

    Excluiu(resposta)
    {      
        var retorno = null;

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
                retorno = {visao:"mensagem.sucesso"
                  ,mensagens:window.ToMensagens("Registro excluido com sucesso.")
                };
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao excluir registro, repita a operação.")
            };
        }
    
        this.Evento(retorno, 'excluiu');
}

    Evento(resposta, acao)
    {        
        if(acao=='pesquisou' 
            || acao=='consultou'
            || acao=='salvou'
            || acao=='excluiu'
            )
        {
        }


        if(acao=='salvou')
        {
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
        else if(acao =='consultou')
        {
            let estado={
                id:resposta.entidade.id
               ,email:resposta.entidade.email
               ,senha:resposta.entidade.senha
               ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            };
            this.setState(estado);
        }
        else if(acao =='excluiu')
        {
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
    }

    SisManterSalvar(entidade)    
    {
        debugger;
        this.setState({visao:'processando'});
        let url = process.env.REACT_APP_SERVER_URL + "/api/usuarioautenticador/autenticar?email="+entidade.email+"&senha="+entidade.senha
        +"&tokenSessao=";
         axios.get(url      
         ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
    }

    Salvou(resposta)
    {
        debugger;
        var retorno = null;

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

                    window.setCookie("token", resposta.data.dados.sessao, 1);
                    retorno = {visao:"mensagem.sucesso",mensagens:window.ToMensagens("Joinha.")};
                    this.props.OnAutenticou({nome:this.state.nome, email:this.state.email });
                }
                 else{
                     
                    window.clearCookie("token");
                    retorno = {visao:"mensagem.sucesso",mensagens:window.ToMensagens("Faio.")};   
                    
            
                } 
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro",mensagens:window.ToMensagens("Erro ao salvar registro, repita a operação.")};
        }

        this.Evento(retorno, 'salvou');

    }


    SisManterConsultar(entidade)
    {

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuario/consultar/" + entidade.id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta))
            .catch((resposta) => this.Consultou(resposta));
    }

    Consultou(resposta)
    {
        var retorno = null;

        if(resposta.status == 200)
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
                retorno = {visao:"consultar"
                    ,entidade:resposta.data.dados
                    ,entidadePesquisa:resposta.data.dados
                    ,mensagens:window.ToMensagens("Consulta retornou com sucesso.")
                };
            }
            
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao consultar registro, repita a operação.")
            };
        }


        //this.props.OnEvento(retorno, 'consultou');
        this.Evento(retorno, 'consultou');
    }


    render()
    {
        return(

<div class="card">
  <div class="card-header">
    
    {this.state.id == 0 ? "I N C L U I R" : "A L T E R A R"}
  </div>
  <div class="card-body">

  <fieldset>

        <div class="form-group">

    
            <input type="text" class="form-control" id="inputEmail"  
                aria-describedby="emailHelp" 
                placeHolder="Informe o email." 
                onChange={(o)=>this.setState({email:o.target.value})}
                value={this.state.email}
            />

            <input type="password" class="form-control" id="inputSenha"  
                aria-describedby="senhaHelp" 
                placeHolder="Informe a senha." 
                onChange={(o)=>this.setState({senha:o.target.value})}
                value={this.state.senha}
            />
            
            <SisMensagemView
                visao={this.state.visao}
                mensagens={this.state.mensagens}
                OnClicou={(v) => this.setState({visao:v})}
            />

            {this.state.visao=='processando' ?
                <div class="text-center">
                    <div class="spinner-border" role="status">
                    </div>
                </div>
            : ""
            }

        </div>

        <FormBotoes
            id={this.props.entidade.id} 
            listaAutorizacao={this.props.listaAutorizacao}
            objetoAutorizacao={this.props.objetoAutorizacao}
            processando={this.props.processando}
            OnExcluir={() => this.Excluir()}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.props.OnVoltar()}
        />

        <button id='inputCadastrar'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnCadastrar() }>Cadastrar  </button>



    </fieldset>

  </div>
</div>
   
   );
        
}
}



export default UsuarioAutenticadorForm;

