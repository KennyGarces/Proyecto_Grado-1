const supabase = require('../config/supabaseClient');

const assignMissionToGroup = async (req, res) => {
  try {
    const { mission_id, group_id } = req.body;

    const { data, error } = await supabase
      .from('mission_assignments')
      .insert([{ mission_id, group_id }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Esta misión ya ha sido asignada a este grupo.' });
      }
      throw error;
    }

    res.status(201).json({ message: 'Misión asignada con éxito', assignment: data });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const profesor_id = req.user.id;

    const { data, error } = await supabase
      .from('mission_assignments')
      .select(`
        mission_id,
        group_id,
        missions ( nombre ),
        groups ( name )
      `)
      .eq('missions.profesor_id', profesor_id);

    if (error) {
      throw error;
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { mission_id, group_id } = req.params;
    const { new_mission_id, new_group_id } = req.body;
    const profesor_id = req.user.id;

    const { data: mission, error: missionError } = await supabase
      .from('missions')
      .select('mission_id')
      .eq('mission_id', mission_id)
      .eq('profesor_id', profesor_id)
      .single();

    if (missionError || !mission) {
      return res.status(403).json({ error: 'No autorizado para editar esta asignación.' });
    }

    const { data, error } = await supabase
      .from('mission_assignments')
      .update({
        mission_id: new_mission_id || mission_id,
        group_id: new_group_id || group_id
      })
      .eq('mission_id', mission_id)
      .eq('group_id', group_id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'Asignación actualizada con éxito', assignment: data });
  } catch (error) {
    console.error("Error al actualizar asignación:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { mission_id, group_id } = req.params;
    const profesor_id = req.user.id;

    const { data: mission, error: missionError } = await supabase
      .from('missions')
      .select('mission_id')
      .eq('mission_id', mission_id)
      .eq('profesor_id', profesor_id)
      .single();

    if (missionError || !mission) {
      return res.status(403).json({ error: 'No autorizado para eliminar esta asignación.' });
    }

    const { error } = await supabase
      .from('mission_assignments')
      .delete()
      .eq('mission_id', mission_id)
      .eq('group_id', group_id);

    if (error) throw error;

    res.json({ message: 'Asignación eliminada con éxito' });
  } catch (error) {
    console.error("Error al eliminar asignación:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  assignMissionToGroup,
  getAssignments,
  updateAssignment,
  deleteAssignment
};
