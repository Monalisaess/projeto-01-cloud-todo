import ListaDeTarefas from '../components/ListaDeTarefas';

function TarefasPendentes({ tarefas, onToggle, onRemove }) {
  const tarefasPendentes = tarefas.filter(tarefa => !tarefa.concluida);
  return (
    <>
      <h2>Tarefas Pendentes</h2>
      <ListaDeTarefas
        tarefas={tarefasPendentes}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    </>
  );
}

export default TarefasPendentes;