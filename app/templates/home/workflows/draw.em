.__workflows__draw
  = workflows/operations-sidebar operations=model.operations groupedOperations=model.groupedOperations
  .container-fluid#diagram-container-wrapper
    .option-bar.row
      .col-12.col-lg-6.vcentered.__name
        = input value=model.workflow.name class="form-control" maxlength='49'
      .col-12.col-lg-6.vcentered.__buttons
        .group.actions.pull-left
          a.btn.btn-primary.btn-md rel="tooltip" title={t 'workflow.draw.save'} onclick={action 'saveWorkflow' null}
            i.mdi.mdi-content-save
          a.btn.btn-primary.btn-md rel="tooltip" title={t 'workflow.draw.saveAs'} onclick={action 'saveAsWorkflow' null}
            i.mdi.mdi-content-save-all
          a.btn.btn-primary.btn-md rel="tooltip" title={t 'workflow.draw.edit'} onclick={action 'toggleEditModal'}
            i.fa.fa-cog
          a.btn.btn-primary.btn-md rel="tooltip" title={t 'workflow.draw.delete'} onclick={action 'toggleDeleteModal'}
            i.far.fa-trash-alt
        .group.execute.pull-left
          a.btn.btn-primary.btn-md onclick={action 'toggleExecutionModal'}
            i.mdi.mdi-play
            span
              = t 'workflows.draw.executeBtn'
    .workflow-diagram-wrapper.row
      = workflows/workflow-diagram workflow=model.workflow operations=model.operations hasChanged=hasChanged formsChanged=formsChanged displayForm=displayForm clickTask=(action 'clickTask') closeForms=(action 'closeForms') getAttributeSuggestions=(action 'getAttributeSuggestions') selectedTask=selectedTask
= workflows/pre-execution-modal executionModal=executionModal clusters=model.clusters jobHash=jobHash workflowName=model.workflow.name executeWorkflow=(action 'executeWorkflow')
= workflows/edit-modal editModal=editModal workflow=model.workflow images=model.images saveWorkflow=(action 'saveWorkflow')
= workflows/alert-modal title=alertContent.title message=alertContent.message alertModal=alertModal alertCallback=alertCallback
= workflows/delete-modal deleteModal=deleteModal deleteWorkflow=(action 'deleteWorkflow') workflow=model.workflow
= workflows/unsaved-changes-modal unsavedModal=unsavedModal saveWorkflow=(action 'saveWorkflow') confirmTransition=(action 'retryTransition') cancelTransition=(action 'abortTransition')
= workflows/create-new-modal createModal=createModal platforms=model.platforms images=model.images transitionToDraw=(action 'transitionToDrawAfterSaveAs') workflow=newWorkflow
