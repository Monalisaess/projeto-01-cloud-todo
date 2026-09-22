import ListaDeTarefas from '../components/ListaDeTarefas';

function TarefasConcluidas({ tarefas, onToggle, onRemove }) {
  const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida);
  return (
    <>
      <h2>Tarefas Concluídas</h2>
      <ListaDeTarefas
        tarefas={tarefasConcluidas}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    </>
  );
}

export default TarefasConcluidas;