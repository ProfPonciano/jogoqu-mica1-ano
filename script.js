/* ============================================================
   A FORJA DA AMÔNIA — SCRIPT CORRIGIDO
   Inicialização robusta + eventos de clique
   Mantém as coordenadas e nomes das imagens do designer.
============================================================ */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        const $ = (id) => document.getElementById(id);

        /* ========================================================
           ELEMENTOS DO HTML
        ======================================================== */

        const telaInicial = $("telaInicial");
        const telaMapa = $("telaMapa");
        const telaJogo = $("telaJogo");
        const telaUltimaChance = $("telaUltimaChance");
        const telaDerrota = $("telaDerrota");
        const telaPortal = $("telaPortal");
        const telaFinal = $("telaFinal");

        const botaoIniciar = $("botaoIniciar");
        const botaoConfirmar = $("botaoConfirmar");
        const botaoContinuar = $("botaoContinuar");
        const botaoRecuperacao = $("botaoRecuperacao");
        const botaoAbrirPortal = $("botaoAbrirPortal");
        const botaoReiniciar = $("botaoReiniciar");

        const jogador = $("jogador");
        const entropia = $("entropia");
        const efeitoVisual = $("efeitoVisual");

        const localAtual = $("localAtual");
        const textoNarrativa = $("textoNarrativa");
        const tituloNivel = $("tituloNivel");
        const pergunta = $("pergunta");
        const alternativas = $("alternativas");

        const cardDesafio = $("cardDesafio");
        const resultadoTitulo = $("resultadoTitulo");
        const resultadoTexto = $("resultadoTexto");
        const fragmentoEncontrado = $("fragmentoEncontrado");

        const fragmentosElemento = $("fragmentos");
        const indicadorDificuldade = $("indicadorDificuldade");

        const perguntaRecuperacao = $("perguntaRecuperacao");
        const alternativasRecuperacao = $("alternativasRecuperacao");

        const campoSenha = $("campoSenha");
        const senhaReferencia = $("senhaReferencia");
        const comparacaoSenha = $("comparacaoSenha");
        const mensagemPortal = $("mensagemPortal");

        const tituloFinal = $("tituloFinal");
        const textoFinal = $("textoFinal");
        const estatisticasFinais = $("estatisticasFinais");

        const falaEntropia = $("falaEntropia");

        const marcadores = document.querySelectorAll(
            ".marcador, .ponto-mapa, .territorio, [data-nivel]"
        );

        const vidasElemento = document.querySelectorAll(
            ".vida, .estabilidade, .atom"
        );


        /* ========================================================
           COORDENADAS ORIGINAIS DO MAPA
           NÃO ALTERAR
        ======================================================== */

        const posicoesMapa = [
            { left: "24.2%", top: "11.8%" },
            { left: "41.8%", top: "10.9%" },
            { left: "59.6%", top: "10.7%" },
            { left: "79.5%", top: "17%" },

            { left: "17.3%", top: "38%" },
            { left: "30.1%", top: "35.6%" },
            { left: "38.7%", top: "42.7%" },
            { left: "54%", top: "38.5%" },
            { left: "74.2%", top: "44%" },

            { left: "21.3%", top: "60.4%" },
            { left: "46.1%", top: "61.2%" },
            { left: "63.6%", top: "63.8%" },

            { left: "20.2%", top: "86.1%" },
            { left: "39.3%", top: "86%" },
            { left: "65.1%", top: "87.6%" }
        ];


        /* ========================================================
           DADOS DOS 15 NÍVEIS
        ======================================================== */

        const niveis = [

            {
                local: "Vila das Massas",
                selo: "MASSA",
                narrativa:
                    "Ao chegar à Vila das Massas, os habitantes tentam reconstruir uma balança química. Somente quem conhece a massa das substâncias poderá reconstruí-la.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual é a massa molar da água, H₂O? Dados: H = 1 g/mol e O = 16 g/mol.",

                        alternativas: [
                            "16 g/mol",
                            "17 g/mol",
                            "18 g/mol",
                            "20 g/mol"
                        ],

                        correta: 2,

                        explicacao:
                            "A massa molar é 2×1 + 16 = 18 g/mol.",

                        codigo: "7"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Qual é a massa molar do CO₂? Dados: C = 12 g/mol e O = 16 g/mol.",

                        alternativas: [
                            "28 g/mol",
                            "32 g/mol",
                            "44 g/mol",
                            "48 g/mol"
                        ],

                        correta: 2,

                        explicacao:
                            "CO₂ possui 12 + 2×16 = 44 g/mol.",

                        codigo: "7-4"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Qual é a massa molar do Ca(OH)₂? Dados: Ca = 40, O = 16 e H = 1.",

                        alternativas: [
                            "57 g/mol",
                            "74 g/mol",
                            "72 g/mol",
                            "90 g/mol"
                        ],

                        correta: 1,

                        explicacao:
                            "40 + 2×(16+1) = 74 g/mol.",

                        codigo: "7-4-2"
                    }

                ]
            },


            {
                local: "Mina do Mol",
                selo: "MOL",
                narrativa:
                    "Dentro da mina existem cristais químicos. Uma inscrição diz: Não conte cristais. Conte mols.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Quantos mols existem em 18 g de H₂O? M(H₂O) = 18 g/mol.",

                        alternativas: [
                            "0,5 mol",
                            "1 mol",
                            "2 mol",
                            "18 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "n = m/M = 18/18 = 1 mol.",

                        codigo: "3"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Quantos mols existem em 44 g de CO₂? M(CO₂) = 44 g/mol.",

                        alternativas: [
                            "0,5 mol",
                            "1 mol",
                            "2 mol",
                            "44 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "44 g correspondem a 1 mol.",

                        codigo: "3-1"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Quantos mols existem em 90 g de H₂O? M(H₂O) = 18 g/mol.",

                        alternativas: [
                            "2 mol",
                            "4 mol",
                            "5 mol",
                            "10 mol"
                        ],

                        correta: 2,

                        explicacao:
                            "n = 90/18 = 5 mol.",

                        codigo: "3-1-5"
                    }

                ]
            },


            {
                local: "Floresta de Avogadro",
                selo: "AVOGADRO",
                narrativa:
                    "As árvores representam partículas químicas. O Guardião Avogadro ensina como contar aquilo que os olhos não podem enxergar.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Quantas partículas existem em 1 mol de qualquer substância?",

                        alternativas: [
                            "6,02 × 10²³",
                            "3,01 × 10²³",
                            "1,00 × 10²³",
                            "9,02 × 10²³"
                        ],

                        correta: 0,

                        explicacao:
                            "Um mol corresponde a aproximadamente 6,02 × 10²³ entidades.",

                        codigo: "A"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Quantas moléculas existem em 2 mol de H₂O?",

                        alternativas: [
                            "6,02 × 10²³",
                            "1,204 × 10²⁴",
                            "3,01 × 10²³",
                            "2,00 × 10²³"
                        ],

                        correta: 1,

                        explicacao:
                            "2 × 6,02 × 10²³ = 1,204 × 10²⁴ moléculas.",

                        codigo: "A-6"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Uma amostra possui 3,01 × 10²³ moléculas de CO₂. Quantos mols ela possui?",

                        alternativas: [
                            "0,25 mol",
                            "0,5 mol",
                            "1 mol",
                            "2 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "n = 3,01×10²³ / 6,02×10²³ = 0,5 mol.",

                        codigo: "A-6-B"
                    }

                ]
            },


            {
                local: "Ponte das Equações",
                selo: "EQUILÍBRIO",
                narrativa:
                    "Uma ponte feita de reações químicas bloqueia o caminho. A Entropia retirou os números das equações. Restaure o equilíbrio para atravessar.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Balanceie: H₂ + O₂ → H₂O",

                        alternativas: [
                            "H₂ + O₂ → H₂O",
                            "2H₂ + O₂ → 2H₂O",
                            "H₂ + 2O₂ → H₂O",
                            "2H₂ + 2O₂ → H₂O"
                        ],

                        correta: 1,

                        explicacao:
                            "A equação balanceada é 2H₂ + O₂ → 2H₂O.",

                        codigo: "2"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Balanceie: Fe + O₂ → Fe₂O₃",

                        alternativas: [
                            "2Fe + O₂ → Fe₂O₃",
                            "4Fe + 3O₂ → 2Fe₂O₃",
                            "Fe + 3O₂ → Fe₂O₃",
                            "3Fe + 2O₂ → 3Fe₂O₃"
                        ],

                        correta: 1,

                        explicacao:
                            "A proporção correta é 4:3:2.",

                        codigo: "2-8"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Balanceie: C₃H₈ + O₂ → CO₂ + H₂O",

                        alternativas: [
                            "C₃H₈ + 3O₂ → 3CO₂ + 4H₂O",
                            "C₃H₈ + 4O₂ → 3CO₂ + 4H₂O",
                            "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
                            "2C₃H₈ + 5O₂ → 3CO₂ + 4H₂O"
                        ],

                        correta: 2,

                        explicacao:
                            "A equação balanceada é C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.",

                        codigo: "2-8-C"
                    }

                ]
            },


            {
                local: "Vale das Fórmulas",
                selo: "FÓRMULA",
                narrativa:
                    "No Vale das Fórmulas, símbolos estão espalhados pelas pedras. Descubra a menor proporção entre os elementos.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual é a fórmula empírica de H₂O₂?",

                        alternativas: [
                            "H₂O₂",
                            "HO",
                            "H₂O",
                            "HO₂"
                        ],

                        correta: 1,

                        explicacao:
                            "Dividindo os índices por 2, obtemos HO.",

                        codigo: "F"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "A fórmula molecular é C₆H₁₂O₆. Qual é sua fórmula empírica?",

                        alternativas: [
                            "C₆H₁₂O₆",
                            "C₃H₆O₃",
                            "CH₂O",
                            "C₂H₄O₂"
                        ],

                        correta: 2,

                        explicacao:
                            "Dividindo os índices por 6, obtemos CH₂O.",

                        codigo: "F-3"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Um composto apresenta proporção C:H:O = 1:2:1. Qual é sua fórmula empírica?",

                        alternativas: [
                            "C₂H₄O₂",
                            "CH₂O",
                            "C₂HO",
                            "CHO₂"
                        ],

                        correta: 1,

                        explicacao:
                            "A proporção já está na menor razão inteira: CH₂O.",

                        codigo: "F-3-1"
                    }

                ]
            },


            {
                local: "Montanhas Percentuais",
                selo: "PERCENTUAL",
                narrativa:
                    "Nas montanhas, cada rocha revela uma porcentagem diferente de seus elementos. Descubra a composição das substâncias.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual é aproximadamente a porcentagem em massa de oxigênio na água, H₂O?",

                        alternativas: [
                            "11,1%",
                            "50,0%",
                            "88,9%",
                            "94,0%"
                        ],

                        correta: 2,

                        explicacao:
                            "16/18 × 100 ≈ 88,9%.",

                        codigo: "P"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Qual é aproximadamente a porcentagem de carbono no CO₂? C=12 e O=16.",

                        alternativas: [
                            "12,0%",
                            "27,3%",
                            "44,0%",
                            "72,7%"
                        ],

                        correta: 1,

                        explicacao:
                            "12/44 ×100 ≈ 27,3%.",

                        codigo: "P-2"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Em 100 g de CaCO₃, considerando Ca=40, C=12 e O=16, aproximadamente quantos gramas são de Ca?",

                        alternativas: [
                            "12 g",
                            "20 g",
                            "40 g",
                            "56 g"
                        ],

                        correta: 2,

                        explicacao:
                            "M(CaCO₃)=100 g/mol; 40 g correspondem ao Ca.",

                        codigo: "P-2-4"
                    }

                ]
            },


            {
                local: "Rio da Estequiometria",
                selo: "ESTEQUIOMETRIA",
                narrativa:
                    "O rio só pode ser atravessado se você compreender a relação quantitativa entre reagentes e produtos.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Na reação 2H₂ + O₂ → 2H₂O, quantos mols de H₂O são formados a partir de 2 mol de H₂?",

                        alternativas: [
                            "1 mol",
                            "2 mol",
                            "3 mol",
                            "4 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "A proporção é 2:2. Logo, formam-se 2 mol de H₂O.",

                        codigo: "E"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Na reação N₂ + 3H₂ → 2NH₃, quantos mols de NH₃ podem ser produzidos a partir de 1 mol de N₂?",

                        alternativas: [
                            "1 mol",
                            "2 mol",
                            "3 mol",
                            "6 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "1 mol de N₂ produz 2 mol de NH₃.",

                        codigo: "E-2"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Na reação 2H₂ + O₂ → 2H₂O, quantos mols de água são produzidos a partir de 4 mol de H₂, com O₂ em excesso?",

                        alternativas: [
                            "2 mol",
                            "4 mol",
                            "6 mol",
                            "8 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "A proporção H₂:H₂O é 1:1. Produzem-se 4 mol.",

                        codigo: "E-2-4"
                    }

                ]
            },


            {
                local: "Caverna do Limitante",
                selo: "LIMITANTE",
                narrativa:
                    "Dois caminhos se encontram na caverna. Identifique qual reagente acaba primeiro.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Na reação N₂ + 3H₂ → 2NH₃, se há 1 mol de N₂ e 3 mol de H₂, qual é o reagente limitante?",

                        alternativas: [
                            "N₂",
                            "H₂",
                            "NH₃",
                            "Nenhum"
                        ],

                        correta: 3,

                        explicacao:
                            "As quantidades estão exatamente na proporção 1:3.",

                        codigo: "L"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Na reação N₂ + 3H₂ → 2NH₃, se há 2 mol de N₂ e 3 mol de H₂, qual é o reagente limitante?",

                        alternativas: [
                            "N₂",
                            "H₂",
                            "NH₃",
                            "Os dois"
                        ],

                        correta: 1,

                        explicacao:
                            "Para 2 mol de N₂ seriam necessários 6 mol de H₂. H₂ é o limitante.",

                        codigo: "L-3"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Na reação 2H₂ + O₂ → 2H₂O, temos 5 mol de H₂ e 2 mol de O₂. Qual é o reagente limitante?",

                        alternativas: [
                            "H₂",
                            "O₂",
                            "H₂O",
                            "Nenhum"
                        ],

                        correta: 1,

                        explicacao:
                            "2 mol de O₂ precisam de 4 mol de H₂. O₂ acaba primeiro.",

                        codigo: "L-3-5"
                    }

                ]
            },


            {
                local: "Laboratório de Proporções",
                selo: "PROPORÇÃO",
                narrativa:
                    "O laboratório possui frascos com massas diferentes. Converta massa em quantidade de matéria.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Quantos mols existem em 32 g de O₂? M(O₂)=32 g/mol.",

                        alternativas: [
                            "0,5 mol",
                            "1 mol",
                            "2 mol",
                            "32 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "n = 32/32 = 1 mol.",

                        codigo: "R"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Quantos mols existem em 98 g de H₂SO₄? M(H₂SO₄)=98 g/mol.",

                        alternativas: [
                            "0,5 mol",
                            "1 mol",
                            "2 mol",
                            "98 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "n = 98/98 = 1 mol.",

                        codigo: "R-9"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Qual massa corresponde a 2 mol de CO₂? M(CO₂)=44 g/mol.",

                        alternativas: [
                            "22 g",
                            "44 g",
                            "66 g",
                            "88 g"
                        ],

                        correta: 3,

                        explicacao:
                            "m = n×M = 2×44 = 88 g.",

                        codigo: "R-9-8"
                    }

                ]
            },


            {
                local: "Planície do Nitrogênio",
                selo: "NITROGÊNIO",
                narrativa:
                    "A planície está coberta por símbolos de N₂ e H₂. O segredo para produzir amônia está na proporção correta.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual é a fórmula química da amônia?",

                        alternativas: [
                            "NH₂",
                            "NH₃",
                            "N₂H",
                            "N₃H"
                        ],

                        correta: 1,

                        explicacao:
                            "A amônia possui fórmula NH₃.",

                        codigo: "N"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Qual reação representa corretamente a formação da amônia?",

                        alternativas: [
                            "N₂ + H₂ → NH₃",
                            "N₂ + 2H₂ → 2NH₃",
                            "N₂ + 3H₂ → 2NH₃",
                            "2N₂ + H₂ → 2NH₃"
                        ],

                        correta: 2,

                        explicacao:
                            "A reação balanceada é N₂ + 3H₂ → 2NH₃.",

                        codigo: "N-3"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Na reação N₂ + 3H₂ → 2NH₃, quantos mols de H₂ são necessários para produzir 4 mol de NH₃?",

                        alternativas: [
                            "3 mol",
                            "4 mol",
                            "6 mol",
                            "12 mol"
                        ],

                        correta: 2,

                        explicacao:
                            "3 mol de H₂ produzem 2 mol de NH₃; para 4 mol, são necessários 6 mol.",

                        codigo: "N-3-6"
                    }

                ]
            },


            {
                local: "Torre do Haber",
                selo: "HABER",
                narrativa:
                    "No topo da torre, o processo industrial de produção de amônia é revelado. Pressão, temperatura e catalisador são fundamentais.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual é a reação global do processo Haber-Bosch?",

                        alternativas: [
                            "N₂ + 3H₂ → 2NH₃",
                            "N₂ + H₂ → NH₃",
                            "2N₂ + 3H₂ → NH₃",
                            "N₂ + 2H₂ → 2NH₃"
                        ],

                        correta: 0,

                        explicacao:
                            "A reação global balanceada é N₂ + 3H₂ ⇌ 2NH₃.",

                        codigo: "H"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Qual elemento é utilizado como catalisador tradicional no processo Haber-Bosch?",

                        alternativas: [
                            "Ferro",
                            "Cobre",
                            "Ouro",
                            "Sódio"
                        ],

                        correta: 0,

                        explicacao:
                            "Catalisadores à base de ferro são tradicionalmente utilizados.",

                        codigo: "H-26"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Por que a alta pressão favorece a formação de NH₃ na reação N₂ + 3H₂ ⇌ 2NH₃?",

                        alternativas: [
                            "Porque aumenta os mols gasosos.",
                            "Porque favorece o lado com menor número de mols gasosos.",
                            "Porque elimina o catalisador.",
                            "Porque produz oxigênio."
                        ],

                        correta: 1,

                        explicacao:
                            "Há 4 mols gasosos nos reagentes e 2 nos produtos.",

                        codigo: "H-26-2"
                    }

                ]
            },


            {
                local: "Templo da Matéria",
                selo: "MATÉRIA",
                narrativa:
                    "O templo guarda uma antiga balança. Relacione massa, quantidade de matéria e partículas.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual relação permite calcular o número de mols a partir da massa?",

                        alternativas: [
                            "n = M/m",
                            "n = m/M",
                            "n = m×M",
                            "n = M+m"
                        ],

                        correta: 1,

                        explicacao:
                            "A quantidade de matéria é n = m/M.",

                        codigo: "T"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Qual relação permite calcular o número de partículas a partir da quantidade de matéria?",

                        alternativas: [
                            "N = n/NA",
                            "N = n×NA",
                            "N = n+NA",
                            "N = NA/n"
                        ],

                        correta: 1,

                        explicacao:
                            "N = n×NA.",

                        codigo: "T-6"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Quantas moléculas existem em 0,5 mol de uma substância?",

                        alternativas: [
                            "1,20 × 10²³",
                            "3,01 × 10²³",
                            "6,02 × 10²³",
                            "12,04 × 10²³"
                        ],

                        correta: 1,

                        explicacao:
                            "0,5 × 6,02×10²³ = 3,01×10²³.",

                        codigo: "T-6-3"
                    }

                ]
            },


            {
                local: "Santuário das Reações",
                selo: "REAÇÃO",
                narrativa:
                    "As paredes exibem diferentes reações químicas. Restaure as proporções corretas.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Na reação 2Na + Cl₂ → 2NaCl, quantos mols de NaCl são produzidos a partir de 2 mol de Na?",

                        alternativas: [
                            "1 mol",
                            "2 mol",
                            "3 mol",
                            "4 mol"
                        ],

                        correta: 1,

                        explicacao:
                            "A proporção é 2 mol de Na para 2 mol de NaCl.",

                        codigo: "S"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Na reação CaCO₃ → CaO + CO₂, quantos mols de CO₂ são produzidos a partir de 3 mol de CaCO₃?",

                        alternativas: [
                            "1 mol",
                            "2 mol",
                            "3 mol",
                            "6 mol"
                        ],

                        correta: 2,

                        explicacao:
                            "A proporção é 1:1. Produzem-se 3 mol.",

                        codigo: "S-3"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Na reação 2KClO₃ → 2KCl + 3O₂, quantos mols de O₂ são produzidos a partir de 4 mol de KClO₃?",

                        alternativas: [
                            "2 mol",
                            "4 mol",
                            "6 mol",
                            "8 mol"
                        ],

                        correta: 2,

                        explicacao:
                            "2 mol de KClO₃ produzem 3 mol de O₂; 4 mol produzem 6 mol.",

                        codigo: "S-3-6"
                    }

                ]
            },


            {
                local: "Forja dos Coeficientes",
                selo: "COEFICIENTE",
                narrativa:
                    "A forja final está próxima. Domine definitivamente o balanceamento químico.",

                desafios: [

                    {
                        dificuldade: "Fácil",
                        pergunta:
                            "Qual é o coeficiente do O₂ na reação balanceada 2H₂ + O₂ → 2H₂O?",

                        alternativas: [
                            "1",
                            "2",
                            "3",
                            "4"
                        ],

                        correta: 0,

                        explicacao:
                            "O coeficiente do O₂ é 1.",

                        codigo: "C"
                    },

                    {
                        dificuldade: "Médio",
                        pergunta:
                            "Qual é o coeficiente do O₂ na reação balanceada 4Fe + 3O₂ → 2Fe₂O₃?",

                        alternativas: [
                            "1",
                            "2",
                            "3",
                            "4"
                        ],

                        correta: 2,

                        explicacao:
                            "O coeficiente do O₂ é 3.",

                        codigo: "C-H"
                    },

                    {
                        dificuldade: "Difícil",
                        pergunta:
                            "Na reação 2KClO₃ → 2KCl + 3O₂, qual é a soma dos coeficientes?",

                        alternativas: [
                            "5",
                            "6",
                            "7",
                            "8"
                        ],

                        correta: 2,

                        explicacao:
                            "2 + 2 + 3 = 7.",

                        codigo: "C-H-7"
                    }

                ]
            }

        ];


        /* ========================================================
           ÚLTIMA CHANCE
        ======================================================== */

        const recuperacao = {

            pergunta:
                "Qual é a proporção correta entre N₂ e H₂ para produzir amônia no processo Haber-Bosch?",

            alternativas: [
                "1 mol de N₂ para 1 mol de H₂",
                "1 mol de N₂ para 2 mol de H₂",
                "1 mol de N₂ para 3 mol de H₂",
                "2 mol de N₂ para 1 mol de H₂"
            ],

            correta: 2
        };


        /* ========================================================
           VARIÁVEIS DO JOGO
        ======================================================== */

        let nivelAtual = 0;
        let desafioAtual = 0;

        let escolhaAtual = null;
        let escolhaRecuperacao = null;

        let estabilidade = 3;

        let acertos = 0;
        let tentativas = 0;
        let pontos = 0;

        let selos = [];


        const pontosDificuldade = {

            "Fácil": 1,
            "Médio": 2,
            "Difícil": 3

        };


        /* ========================================================
           MOSTRAR TELA
        ======================================================== */

        function mostrarTela(tela) {

            const telas = [

                telaInicial,
                telaMapa,
                telaJogo,
                telaUltimaChance,
                telaDerrota,
                telaPortal,
                telaFinal

            ].filter(Boolean);


            telas.forEach(function (t) {

                t.classList.remove(
                    "ativa",
                    "active",
                    "visivel",
                    "mostrar"
                );

                t.style.display = "none";

            });


            if (!tela) return;


            tela.style.display = "";


            tela.classList.add(
                "ativa",
                "active",
                "visivel",
                "mostrar"
            );

        }


        /* ========================================================
           VIDAS
        ======================================================== */

        function atualizarVidas() {

            vidasElemento.forEach(function (vida, indice) {

                if (indice >= estabilidade) {

                    vida.classList.add("perdida");
                    vida.classList.add("vazia");

                } else {

                    vida.classList.remove("perdida");
                    vida.classList.remove("vazia");

                }

            });

        }


        /* ========================================================
           SELOS
        ======================================================== */

        function atualizarSelos() {

            if (fragmentosElemento) {

                fragmentosElemento.textContent =
                    `${selos.length} / 15`;

            }

        }


        /* ========================================================
           MOVIMENTO DO PERSONAGEM
        ======================================================== */

        function moverJogador() {

            if (!jogador) return;

            const posicao =
                posicoesMapa[nivelAtual];

            if (!posicao) return;


            jogador.style.left =
                posicao.left;

            jogador.style.top =
                posicao.top;

            jogador.style.position =
                "absolute";

            jogador.style.zIndex =
                "100";

        }


        /* ========================================================
           MARCADORES
        ======================================================== */

        function atualizarMarcadores() {

            marcadores.forEach(function (marcador, indice) {

                const numero =
                    indice + 1;


                marcador.classList.remove(
                    "concluido",
                    "atual"
                );


                if (numero <= nivelAtual) {

                    marcador.classList.add(
                        "concluido"
                    );

                }


                if (numero === nivelAtual + 1) {

                    marcador.classList.add(
                        "atual"
                    );

                }

            });

        }


        /* ========================================================
           CARREGAR DESAFIO
        ======================================================== */

        function carregarDesafio() {

            const nivel =
                niveis[nivelAtual];

            const desafio =
                nivel.desafios[desafioAtual];


            escolhaAtual = null;


            if (localAtual) {

                localAtual.textContent =
                    nivel.local;

            }


            if (tituloNivel) {

                tituloNivel.textContent =
                    `Território ${nivelAtual + 1} — Desafio ${desafioAtual + 1}/3`;

            }


            if (textoNarrativa) {

                textoNarrativa.textContent =
                    nivel.narrativa;

            }


            if (pergunta) {

                pergunta.textContent =
                    desafio.pergunta;

            }


            if (indicadorDificuldade) {

                indicadorDificuldade.textContent =
                    `${desafio.dificuldade} • ${pontosDificuldade[desafio.dificuldade]} ponto(s)`;

            }


            if (alternativas) {

                alternativas.innerHTML = "";


                desafio.alternativas.forEach(
                    function (texto, indice) {

                        const botao =
                            document.createElement("button");


                        botao.type =
                            "button";


                        botao.className =
                            "alternativa";


                        botao.dataset.indice =
                            indice;


                        botao.textContent =
                            `${String.fromCharCode(65 + indice)}. ${texto}`;


                        botao.addEventListener(
                            "click",
                            function (evento) {

                                evento.preventDefault();

                                evento.stopPropagation();


                                escolhaAtual =
                                    indice;


                                alternativas
                                    .querySelectorAll(
                                        ".alternativa"
                                    )
                                    .forEach(
                                        function (b) {

                                            b.classList.remove(
                                                "selecionada",
                                                "selected"
                                            );

                                        }
                                    );


                                botao.classList.add(
                                    "selecionada",
                                    "selected"
                                );


                                if (botaoConfirmar) {

                                    botaoConfirmar.disabled =
                                        false;

                                    botaoConfirmar.removeAttribute(
                                        "disabled"
                                    );

                                }

                            }
                        );


                        alternativas.appendChild(
                            botao
                        );

                    }
                );

            }


            if (botaoConfirmar) {

                botaoConfirmar.disabled =
                    true;

            }


            if (resultadoTitulo) {

                resultadoTitulo.textContent =
                    "";

            }


            if (resultadoTexto) {

                resultadoTexto.innerHTML =
                    "";

            }


            if (fragmentoEncontrado) {

                fragmentoEncontrado.innerHTML =
                    "";

            }


            if (cardDesafio) {

                cardDesafio.classList.remove(
                    "virado",
                    "acerto",
                    "erro"
                );

            }


            atualizarMarcadores();

            moverJogador();

        }


        /* ========================================================
           VERIFICAR RESPOSTA
        ======================================================== */

        function verificarResposta(evento) {

            if (evento) {

                evento.preventDefault();

                evento.stopPropagation();

            }


            if (escolhaAtual === null) {

                return;

            }


            const desafio =
                niveis[nivelAtual]
                    .desafios[desafioAtual];


            tentativas++;


            if (
                escolhaAtual ===
                desafio.correta
            ) {

                tratarAcerto(
                    desafio
                );

            } else {

                tratarErro(
                    desafio
                );

            }


            if (cardDesafio) {

                setTimeout(
                    function () {

                        cardDesafio.classList.add(
                            "virado"
                        );

                    },
                    100
                );

            }

        }


        /* ========================================================
           ACERTO
        ======================================================== */

        function tratarAcerto(desafio) {

            acertos++;


            pontos +=
                pontosDificuldade[
                    desafio.dificuldade
                ];


            if (resultadoTitulo) {

                resultadoTitulo.textContent =
                    "✨ Resposta correta!";

                resultadoTitulo.className =
                    "resultado-acerto";

            }


            if (resultadoTexto) {

                resultadoTexto.innerHTML =

                    `<span class="mensagem-sucesso">` +
                    `Você dominou este desafio.` +
                    `</span><br><br>` +

                    `${desafio.explicacao}` +

                    `<br><br>` +

                    `<strong>` +
                    `+${pontosDificuldade[desafio.dificuldade]} ponto(s)` +
                    `</strong>`;

            }


            if (fragmentoEncontrado) {

                fragmentoEncontrado.innerHTML =

                    `<div class="codigo-recompensa">` +
                    `Código da Forja: ${desafio.codigo}` +
                    `</div>`;

            }


            if (
                desafioAtual === 2 &&
                !selos.includes(
                    niveis[nivelAtual].selo
                )
            ) {

                selos.push(
                    niveis[nivelAtual].selo
                );


                atualizarSelos();


                if (fragmentoEncontrado) {

                    fragmentoEncontrado.innerHTML +=

                        `<div class="selo-recompensa">` +
                        `🏆 SELO ${niveis[nivelAtual].selo} CONQUISTADO!` +
                        `</div>`;

                }

            }


            if (cardDesafio) {

                cardDesafio.classList.add(
                    "acerto"
                );

            }

        }


        /* ========================================================
           ERRO
        ======================================================== */

        function tratarErro(desafio) {

            estabilidade--;


            atualizarVidas();


            if (resultadoTitulo) {

                resultadoTitulo.textContent =
                    "⚠️ A Entropia interferiu!";

                resultadoTitulo.className =
                    "resultado-erro";

            }


            if (resultadoTexto) {

                resultadoTexto.innerHTML =

                    `<span class="mensagem-erro">` +
                    `Resposta incorreta.` +
                    `</span><br><br>` +

                    `${desafio.explicacao}` +

                    `<br><br>` +

                    `Você perdeu 1 átomo de estabilidade.`;

            }


            if (fragmentoEncontrado) {

                fragmentoEncontrado.innerHTML =

                    `<div class="codigo-recompensa">` +
                    `Código deste desafio: ${desafio.codigo}` +
                    `</div>`;

            }


            if (entropia) {

                entropia.classList.add(
                    "ativa"
                );

            }


            if (cardDesafio) {

                cardDesafio.classList.add(
                    "erro"
                );

            }

        }


        /* ========================================================
           CONTINUAR
        ======================================================== */

        function continuar(evento) {

            if (evento) {

                evento.preventDefault();

                evento.stopPropagation();

            }


            if (estabilidade <= 0) {

                abrirUltimaChance();

                return;

            }


            if (desafioAtual < 2) {

                desafioAtual++;

                carregarDesafio();

                return;

            }


            if (
                nivelAtual <
                niveis.length - 1
            ) {

                nivelAtual++;

                desafioAtual = 0;

                carregarDesafio();

                return;

            }


            abrirPortal();

        }


        /* ========================================================
           ÚLTIMA CHANCE
        ======================================================== */

        function abrirUltimaChance() {

            escolhaRecuperacao =
                null;


            mostrarTela(
                telaUltimaChance
            );


            if (perguntaRecuperacao) {

                perguntaRecuperacao.textContent =
                    recuperacao.pergunta;

            }


            if (alternativasRecuperacao) {

                alternativasRecuperacao.innerHTML =
                    "";


                recuperacao.alternativas.forEach(
                    function (texto, indice) {

                        const botao =
                            document.createElement("button");


                        botao.type =
                            "button";


                        botao.className =
                            "alternativa";


                        botao.textContent =
                            `${String.fromCharCode(65 + indice)}. ${texto}`;


                        botao.addEventListener(
                            "click",
                            function (evento) {

                                evento.preventDefault();

                                evento.stopPropagation();


                                escolhaRecuperacao =
                                    indice;


                                alternativasRecuperacao
                                    .querySelectorAll(
                                        ".alternativa"
                                    )
                                    .forEach(
                                        function (b) {

                                            b.classList.remove(
                                                "selecionada",
                                                "selected"
                                            );

                                        }
                                    );


                                botao.classList.add(
                                    "selecionada",
                                    "selected"
                                );


                                if (botaoRecuperacao) {

                                    botaoRecuperacao.disabled =
                                        false;

                                    botaoRecuperacao.removeAttribute(
                                        "disabled"
                                    );

                                }

                            }
                        );


                        alternativasRecuperacao.appendChild(
                            botao
                        );

                    }
                );

            }


            if (botaoRecuperacao) {

                botaoRecuperacao.disabled =
                    true;

            }

        }


        /* ========================================================
           VERIFICAR ÚLTIMA CHANCE
        ======================================================== */

        function verificarRecuperacao(evento) {

            if (evento) {

                evento.preventDefault();

                evento.stopPropagation();

            }


            if (
                escolhaRecuperacao ===
                recuperacao.correta
            ) {

                estabilidade =
                    1;


                atualizarVidas();


                if (entropia) {

                    entropia.classList.remove(
                        "ativa"
                    );

                }


                mostrarTela(
                    telaJogo
                );


                carregarDesafio();

            } else {

                mostrarDerrota();

            }

        }


        /* ========================================================
           DERROTA
        ======================================================== */

        function mostrarDerrota() {

            if (falaEntropia) {

                falaEntropia.textContent =
                    "Vocês chegaram longe demais. " +
                    "A ordem da matéria se dissolveu... " +
                    "Mas a Forja poderá ser reativada " +
                    "em uma nova tentativa.";

            }


            mostrarTela(
                telaDerrota
            );

        }


        /* ========================================================
           PORTAL
        ======================================================== */

        function abrirPortal() {

            mostrarTela(
                telaPortal
            );


            if (senhaReferencia) {

                senhaReferencia.textContent =
                    "C — H — 34";

            }


            if (campoSenha) {

                campoSenha.value =
                    "";

                campoSenha.focus();

            }


            if (comparacaoSenha) {

                comparacaoSenha.innerHTML =
                    "";

            }


            if (mensagemPortal) {

                mensagemPortal.textContent =
                    "Organize os três fragmentos para abrir a Forja.";

            }

        }


        /* ========================================================
           NORMALIZAR SENHA
        ======================================================== */

        function normalizarSenha(valor) {

            return String(valor || "")
                .toUpperCase()
                .trim()
                .replace(
                    /[–—−]/g,
                    "-"
                )
                .replace(
                    /\s+/g,
                    ""
                );

        }


        /* ========================================================
           VERIFICAR PORTAL
        ======================================================== */

        function verificarPortal(evento) {

            if (evento) {

                evento.preventDefault();

                evento.stopPropagation();

            }


            const resposta =
                normalizarSenha(
                    campoSenha
                        ? campoSenha.value
                        : ""
                );


            if (
                resposta ===
                "C-H-34"
            ) {

                if (mensagemPortal) {

                    mensagemPortal.innerHTML =
                        `<span class="mensagem-sucesso">` +
                        `🔓 FORJA REATIVADA!` +
                        `</span>`;

                }


                setTimeout(
                    mostrarFinal,
                    500
                );

            } else {

                if (mensagemPortal) {

                    mensagemPortal.innerHTML =
                        `<span class="mensagem-erro">` +
                        `Código incorreto. Use C-H-34.` +
                        `</span>`;

                }

            }

        }


        /* ========================================================
           TELA FINAL
        ======================================================== */

        function mostrarFinal() {

            mostrarTela(
                telaFinal
            );


            const aproveitamento =
                tentativas
                    ? Math.round(
                        (acertos /
                            tentativas) *
                        100
                    )
                    : 0;


            if (tituloFinal) {

                tituloFinal.textContent =
                    "🏆 MESTRE DA ESTEQUIOMETRIA";

            }


            if (textoFinal) {

                textoFinal.innerHTML =

                    "A Química foi reorganizada.<br><br>" +

                    "Os 15 Selos da Estequiometria foram recuperados.<br>" +

                    "A Grande Forja de Nitrogênio está novamente funcionando.<br><br>" +

                    "<strong>" +
                    "Você não apenas encontrou as respostas." +
                    "</strong><br>" +

                    "Você aprendeu a transformar matéria, quantidade e proporção.<br><br>" +

                    "⚗️ <strong>MISSÃO CONCLUÍDA!</strong>";

            }


            if (estatisticasFinais) {

                estatisticasFinais.innerHTML =

                    `<strong>Selos:</strong> ` +
                    `${selos.length} / 15<br>` +

                    `<strong>Acertos:</strong> ` +
                    `${acertos} / ${tentativas}<br>` +

                    `<strong>Aproveitamento:</strong> ` +
                    `${aproveitamento}%<br>` +

                    `<strong>Pontuação:</strong> ` +
                    `${pontos} / 90<br>` +

                    `<strong>Estabilidade:</strong> ` +
                    `${estabilidade} ⚛`;

            }

        }


        /* ========================================================
           INICIAR / REINICIAR
        ======================================================== */

        function iniciarJogo(evento) {

            if (evento) {

                evento.preventDefault();

                evento.stopPropagation();

            }


            nivelAtual = 0;

            desafioAtual = 0;

            escolhaAtual = null;

            escolhaRecuperacao = null;

            estabilidade = 4;

            acertos = 0;

            tentativas = 0;

            pontos = 0;

            selos = [];


            atualizarVidas();

            atualizarSelos();

            atualizarMarcadores();

            moverJogador();


            mostrarTela(
                telaJogo
            );


            carregarDesafio();

        }


        /* ========================================================
           EVENTOS DOS BOTÕES
        ======================================================== */

        if (botaoIniciar) {

            botaoIniciar.type =
                "button";

            botaoIniciar.addEventListener(
                "click",
                iniciarJogo
            );

        }


        if (botaoConfirmar) {

            botaoConfirmar.type =
                "button";

            botaoConfirmar.addEventListener(
                "click",
                verificarResposta
            );

        }


        if (botaoContinuar) {

            botaoContinuar.type =
                "button";

            botaoContinuar.addEventListener(
                "click",
                continuar
            );

        }


        if (botaoRecuperacao) {

            botaoRecuperacao.type =
                "button";

            botaoRecuperacao.addEventListener(
                "click",
                verificarRecuperacao
            );

        }


        if (botaoAbrirPortal) {

            botaoAbrirPortal.type =
                "button";

            botaoAbrirPortal.addEventListener(
                "click",
                verificarPortal
            );

        }


        if (botaoReiniciar) {

            botaoReiniciar.type =
                "button";

            botaoReiniciar.addEventListener(
                "click",
                iniciarJogo
            );

        }


        if (campoSenha) {

            campoSenha.addEventListener(
                "keydown",
                function (evento) {

                    if (
                        evento.key ===
                        "Enter"
                    ) {

                        verificarPortal(
                            evento
                        );

                    }

                }
            );

        }


        /* ========================================================
           GARANTIR QUE BOTÕES NÃO ENVIEM FORMULÁRIO
        ======================================================== */

        document
            .querySelectorAll("button")
            .forEach(
                function (botao) {

                    if (
                        !botao.getAttribute(
                            "type"
                        )
                    ) {

                        botao.setAttribute(
                            "type",
                            "button"
                        );

                    }

                }
            );


        /* ========================================================
           ESTADO INICIAL
        ======================================================== */

        atualizarVidas();

        atualizarSelos();

        atualizarMarcadores();

        moverJogador();


        console.log(
            "A Forja da Amônia: script carregado corretamente."
        );

    });

})();