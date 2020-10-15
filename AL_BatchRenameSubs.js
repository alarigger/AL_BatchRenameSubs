
/******************************** B A T C H   R E N A M E  ***************************/
/*
Alexandre Cormier 
15/10/2020
www.alarigger.com
*/

function AL_BatchRenameSubs(){

	/*rename subs with the same name in several drawings in one click 
	*/

	/***************** V A R I A B L E S */

	var selectedNodes = selection.numberOfNodesSelected(); 

	var curFrame = frame.current();

	var POSE_NAME = "unamed_pose";

	var numSelLayers = Timeline.numLayerSel;


	/**************** E X E C U T I O N */



	scene.beginUndoRedoAccum("AL_BatchRenameSubs");

	inputDialog()



	scene.endUndoRedoAccum();



	/**************** F U N C T I O N S */ 


	/*I N P U T   D I A L O G*/

	function inputDialog() {

		MessageLog.trace("inputDialog")

		   var d = new Dialog()
		   d.title = "Create_Pose";
		   d.width = 100;

		var nameInput = new LineEdit();
		nameInput.label = "Sub name : ";
		nameInput.maximum = 1000;
		nameInput.minimum = 1;
		d.add( nameInput );


		if ( d.exec() ){

		 POSE_NAME = nameInput.text;

		 Rename_subtitutions();

		}


	}
	
	function Extract_drawingName(tvgname){
		var split0=tvgname.split('-');

		var split1=split0[1];
		
		var result = "";

		if(split1 != "" &&typeof(split1) == "string"){
			var split2 = split1.split('.')
			var  oldTiming= split2[0];	
			result = oldTiming;
		}
		return result;
	}

	function Rename_subtitutions(){

		MessageLog.trace("\n===============Add_BatchRenameSubs")

		for ( var i = 0; i < numSelLayers; i++ ){

			if ( Timeline.selIsColumn(i)){

				var currentColumn = Timeline.selToColumn(i);
				MessageLog.trace(currentColumn );

				if (column.type(currentColumn) == "DRAWING"){

					
					
					var sub_timing = column.getDrawingTimings(currentColumn);
					var number_of_subs = sub_timing.length;
					
					for(var s=0; s<number_of_subs ;s++){

						
						var sub_name = Extract_drawingName(sub_timing[s])
						MessageLog.trace("subname : "+sub_timing[s]);
						MessageLog.trace("posename : "+POSE_NAME);
						
						if(sub_timing[s] == POSE_NAME){
							MessageBox.warning("the pose name already exist in the selected drawings");
							return;
						}
						MessageLog.trace("no match");

					}
					
					//column.duplicateDrawingAt (currentColumn, curFrame)	
					
					var DrawingName =column.getDrawingName(currentColumn,curFrame)
	

					var oldTiming= Extract_drawingName(DrawingName)

					var newTiming = POSE_NAME; 


					var renameOperation = column.renameDrawing(currentColumn, oldTiming,newTiming )	


					MessageLog.trace( DrawingName );
					MessageLog.trace("oldTiming : "+oldTiming);
					MessageLog.trace("NewTiming : "+newTiming);
					MessageLog.trace("drawing renamed :"+ renameOperation);

				}

				MessageLog.trace("\n===============BatchRenameSubs____")

			}

		}

	}

}
