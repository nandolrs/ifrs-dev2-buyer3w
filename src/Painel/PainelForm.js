import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class PainelForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        this.state={
            id:0
           ,nome:''
           ,visao:process.env.REACT_APP_VISAO_INFORMANDO
           ,mensagens:null

       };
        this.SisManterConsultar({});
    }
        
    componentDidMount()
    {
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
        else if(acao =='consultou-estoque-por-classe')
        {
            this.GraficoMontarEstoquePorClasse(resposta.entidadePesquisa);
        }
        else if(acao =='consultou-ponto-minimo-por-classe')
        {
            this.GraficoMontarPontoMinimoPorClasse(resposta.entidadePesquisa);
        }
        else if(acao =='excluiu')
        {
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }

    }


    GraficoMontarEstoquePorClasse(entidade)
    {
        let entidade_ = [
        ];

        if(entidade != null){entidade_ = entidade;}

        let titulo_ ='Estoque por Classe';

        let linhas_ = [];

        entidade_.map((e) =>
            {
                linhas_.push([e.classeNome, e.estoqueQuantidade]);
            }

        );
        window.drawChart({titulo: titulo_
        ,linhas: linhas_
        }
        ,'grafico-estoque-por-classe');

    }


    GraficoMontarPontoMinimoPorClasse(entidade)
    {
        let entidade_ = [
        ];

        if(entidade != null){entidade_ = entidade;}

        let titulo_ ='Ponto minimo por Classe';

        let linhas_ = [];

        entidade_.map((e) =>
            {
                linhas_.push([e.classeNome, e.estoqueQuantidade]);
            }

        );
        window.drawChart({titulo: titulo_
        ,linhas: linhas_
        }
        ,'grafico-ponto-minimo-por-classe');

    }



    SisManterConsultar(entidade)
    {

        // estoque por classe

        let url = '/api/info/pesquisarEstoquePorClasse?nome';

        axios.get(process.env.REACT_APP_SERVER_URL + url // "/api/local/consultar/" + entidade.id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta,'consultou-estoque-por-classe'))
            .catch((resposta) => this.Consultou(resposta,'consultou-estoque-por-classe'));

        // ponto minimo por classe

        url = '/api/info/pesquisarPontoMinimoPorClasse?nome';

        axios.get(process.env.REACT_APP_SERVER_URL + url // "/api/local/consultar/" + entidade.id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta,'consultou-ponto-minimo-por-classe'))
            .catch((resposta) => this.Consultou(resposta,'consultou-ponto-minimo-por-classe'));
        
    }

    Consultou(resposta, acao)
    {
        debugger;

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
                    ,entidadePesquisa:resposta.data.dadosLista
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
        this.Evento(retorno, acao); // 'consultou'
    }

    Validar(entidade)
    {
        let validar = {ok:true, mensagens:[]};
        let retorno = {};

        if(entidade.nome.length == 0)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe o nome.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }

        if(entidade.nome.length < 3)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe ao menos 3 caracteres no nome.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }
        return validar;

    }

    render()
    {
        return(

<div class="card">
  <div class="card-header">
    {"ESTOQUE POR CLASSE"}
  </div>
  <div class="card-body">

  <fieldset>

        <div class="form-group">


        <div id="grafico-estoque-por-classe">  Gráfico estoque por classe </div>
        <div id="grafico-ponto-minimo-por-classe">  Gráfico ponto minimo por classe </div>

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

        {/* <FormBotoes
            id={this.props.entidade.id} 
            listaAutorizacao={this.props.listaAutorizacao}
            objetoAutorizacao={this.props.objetoAutorizacao}
            processando={this.props.processando}
            OnExcluir={() => this.Excluir()}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.props.OnVoltar()}
        /> */}


    </fieldset>

  </div>
</div>
                            
        );
    
    }

}


export default PainelForm;

/*

https://ifrs-dev2-buyer.herokuapp.com/api/info/pesquisarEstoquePorClasse?nome
http://localhost:8080/api/info/pesquisarEstoquePorClasse?nome
https://newbedev.com/how-to-use-onload-in-react
https://developers.google.com/chart/interactive/docs/basic_draw_chart
*/